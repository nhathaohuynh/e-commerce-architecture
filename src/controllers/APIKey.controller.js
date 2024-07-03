const { Created } = require('../cores/custom-http-response/response.success')
const apiKeyService = require('../services/apiKey.service')

class APIKeyController {
	async createAPIKey(req, res) {
		return new Created({
			message: 'API Key created',
			metaData: {
				data: await apiKeyService.createAPIKey(req.body),
			},
		}).send(res)
	}
}

module.exports = new APIKeyController()
