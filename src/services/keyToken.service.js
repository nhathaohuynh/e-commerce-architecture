const { BadRequest } = require('../cores/custom-http-response/response.error')
const { keyTokenRepository } = require('../repositories')

class KeyTokenService {
	async createKeyToken({ user, publicKey }) {
		try {
			const publicKeyString = publicKey.toString()
			const tokenKeys = await keyTokenRepository.createKeyToken({
				user: user.id,
				publicKey: publicKeyString,
			})

			return tokenKeys ? tokenKeys.publicKey : null
		} catch (error) {
			return next(new BadRequest(error.message))
		}
	}
}

module.exports = new KeyTokenService()
