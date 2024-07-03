const { Created } = require('../cores/custom-http-response/response.success')
const { templateService } = require('../services')
const emailTemplate = require('../cores/email-template/email-template')
class templateController {
	async createTemplate(req, res) {
		const { name } = req.body

		return new Created({
			message: 'Template created successfully',
			data: await templateService.createTemplate({
				name,
				html: emailTemplate[name],
			}),
		}).send(res)
	}
}

module.exports = new templateController()
