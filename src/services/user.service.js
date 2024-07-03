const { STATUS_CODE_REPONSE } = require('../constants')
const { userRepository } = require('../repositories')
const crypto = require('crypto')
const {
	generateSalt,
	hashPassword,
	generateToken,
	getFieldsOfObject,
	generateRandomPassword,
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

		const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
			modulusLength: 4096,
			publicKeyEncoding: {
				type: 'pkcs1', // key cryptoGraphy keystore standaers
				format: 'pem',
			},

			privateKeyEncoding: {
				type: 'pkcs1', // key cryptoGraphy keystore standaers
				format: 'pem',
			},
		})

		await keyTokenService.createKeyToken({
			user: { id: user._id },
			publicKey,
		})

		const accessToken = generateToken({
			user: { id: user._id, email: user.email },
			privateKey,
			expirseIn: '1h',
		})
		const refreshToken = generateToken({
			user: { id: user._id, email: user.email },
			privateKey,
			expirseIn: '7d',
		})

		return {
			data: {
				user: getFieldsOfObject(user, ['email', 'name']),
				accessToken,
				refreshToken,
			},
		}
	}
}

module.exports = new UserService()
