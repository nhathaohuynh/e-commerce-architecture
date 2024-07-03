const {
	CreatedReponse,
	OKReponse,
} = require('../cores/custom-http-response/response.success')
const { templateService } = require('../services')
const emailTemplate = require('../cores/email-template/email-template')
class templateController {
	async createTemplate(req, res) {
		const { name } = req.body

		return new CreatedReponse({
			message: 'Template created successfully',
			metaData: await templateService.createTemplate({
				name,
				html: emailTemplate[name],
			}),
		}).send(res)
	}

	async getListTemplate(req, res) {
		return new OKReponse({
			metaData: await templateService.getListTemplate(),
		}).send(res)
	}

	async updateTemplate() {
		return new OKReponse({
			metaData: await templateService.updateTemplate(),
		}).send(res)
	}

	async removeTemplate(req, res) {
		console.log('id', req.params.id)
		return new OKReponse({
			metaData: await templateService.removeTemplate(req.params.id),
		}).send(res)
	}
}

module.exports = new templateController()
