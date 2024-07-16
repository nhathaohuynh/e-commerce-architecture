const {
	CreatedResponse,
} = require('../cores/custom-http-response/response.success')
const apiKeyService = require('../services/apiKey.service')

class APIKeyController {
	async createAPIKey(req, res) {
		return new CreatedResponse({
			message: 'API Key created',
			metaData: {
				data: await apiKeyService.createAPIKey(req.body),
			},
		}).send(res)
	}

	async getListAPIKey(req, res) {
		return new CreatedResponse({
			message: 'List API Key',
			metaData: {
				data: await apiKeyService.getListAPIKey(),
			},
		}).send(res)
	}

	async removeAPIKey(req, res) {
		await apiKeyService.removeAPIKey(req.params.id)
		return new CreatedResponse({
			message: 'API Key removed',
		}).send(res)
	}
}

module.exports = new APIKeyController()
