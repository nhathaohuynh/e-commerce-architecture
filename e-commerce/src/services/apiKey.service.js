const { BadRequest } = require('../cores/custom-http-response/response.error')
const { apiKeyRepository } = require('../repositories')
const crypto = require('crypto')
const { getFieldsOfObject } = require('../utils')
class APIKeyService {
	async createAPIKey({ permissions }) {
		const key = crypto.randomBytes(32).toString('hex')
		const apiKey = await apiKeyRepository.createAPIKey({ key, permissions })

		if (!apiKey) {
			throw new BadRequest({
				status: -1,
				message: 'API Key creation failed',
			})
		}

		return {
			data: getFieldsOfObject(apiKey, ['key', 'permissions']),
		}
	}

	async removeAPIKey() {}

	async getListAPIKey() {}
}

module.exports = new APIKeyService()
