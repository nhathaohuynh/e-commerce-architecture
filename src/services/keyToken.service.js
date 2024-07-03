const { BadRequest } = require('../cores/custom-http-response/response.error')
const { keyTokenRepository } = require('../repositories')
const crypto = require('crypto')
const { generateToken } = require('../utils')
const { EXPIRED_TIME } = require('../constants')

class KeyTokenService {
	async createKeyToken({ user, publicKey, privateKey, refreshToken }) {
		try {
			const filter = { user: user.id }
			const update = {
				publicKey: publicKey.toString(),
				refreshTokenUsed: [],
				refreshToken,
			}
			const options = { upsert: true, new: true }

			const tokens = keyTokenRepository.findOneAndUpdateToken(
				filter,
				update,
				options,
			)

			return tokens ? tokens.publicKey : null
		} catch (error) {
			return next(new BadRequest(error.message))
		}
	}

	async generateAccessAndRefreshToken({ user }) {
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

		const accessToken = generateToken({
			user: { id: user._id, email: user.email },
			privateKey,
			expirseIn: EXPIRED_TIME.ACCESS_TOKEN,
		})
		const refreshToken = generateToken({
			user: { id: user._id, email: user.email },
			privateKey,
			expirseIn: EXPIRED_TIME.REFRESH_TOKEN,
		})

		await this.createKeyToken({
			user: { id: user._id },
			publicKey,
			privateKey,
			refreshToken,
		})

		return {
			accessToken,
			refreshToken,
		}
	}

	async findKeyTokenByUserID(userID) {
		return await keyTokenRepository.findKeyTokenByUserID(userID)
	}

	async removeKeyTokenByUserID(userId) {
		return await keyTokenRepository.removeKeyTokenByUserID(userId)
	}
}

module.exports = new KeyTokenService()
