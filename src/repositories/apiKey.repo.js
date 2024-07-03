const apiKeyModel = require('../models/apiKey')

class APIKeyRepository {
	async findAPiIKeyByKey(key) {
		return await apiKeyModel.findOne({ key, status: true }).lean()
	}

	async createAPIKey({ key, permissions }) {
		return await apiKeyModel.create({ key, permissions })
	}
}

module.exports = new APIKeyRepository()
