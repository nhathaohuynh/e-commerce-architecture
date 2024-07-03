const { userRepository } = require('../repositories')
const {
	generateSalt,
	hashPassword,
	getFieldsOfObject,
	generateRandomPassword,
	comparePassword,
} = require('../utils')
const keyTokenService = require('./keyToken.service')
const { BadRequest } = require('../cores/custom-http-response/response.error')
const emailService = require('./email.service')

class UserService {
	async register({ email }) {
		const holderUser = await userRepository.findUserByEmail(email)

		if (holderUser) throw new BadRequest('User already registered')
		await emailService.sendEmailVerifyToken({ email })

		return {
			data: null,
		}
	}

	async verifyEmail(token) {
		// 1.check token in model otp
		const { otpEmail } = await emailService.checkEmailOTPToken({
			token,
		})
		if (!otpEmail) throw new BadRequest('Token not found')

		// 2. check email exists in user model
		const hasUser = await userRepository.findUserByEmail(otpEmail)
		if (hasUser) throw new BadRequest('Email already exists')

		const salt = await generateSalt()
		const password = generateRandomPassword()
		const name = otpEmail.split('@')[0]
		const hashedPassword = await hashPassword(password, salt)

		const [_, user] = await Promise.all([
			emailService.sendEmailTemporaryPassword({ password, email: otpEmail }),
			userRepository.createUser({
				email: otpEmail,
				name,
				password: hashedPassword,
			}),
		])

		if (!user) throw new BadRequest('User not created')

		const { accessToken, refreshToken } =
			await keyTokenService.generateAccessAndRefreshToken({ user })

		return {
			data: {
				user: getFieldsOfObject(user, ['email', 'name']),
				accessToken,
				refreshToken,
			},
		}
	}

	async login({ email, password }) {
		const user = await userRepository.findUserByEmail(email)
		if (!user) throw new BadRequest('User not found')

		const isPasswordMatch = await comparePassword(password, user.password)
		if (!isPasswordMatch) throw new BadRequest('Password not match')

		const { accessToken, refreshToken } =
			await keyTokenService.generateAccessAndRefreshToken({ user })

		return {
			data: {
				user: getFieldsOfObject(user, ['email', 'name']),
				accessToken,
				refreshToken,
			},
		}
	}

	async logout(user) {
		const response = await keyTokenService.removeKeyTokenByUserID(user.id)

		if (response?.deletedCount < 1) throw new BadRequest('Logout failed')

		return {
			data: {
				userID: user.id,
			},
		}
	}

	async refreshToken(user) {}
}

module.exports = new UserService()
