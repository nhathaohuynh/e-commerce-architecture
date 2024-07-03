const { templateRepository } = require('../repositories')

class TemplateService {
	constructor() {
		this.templateRepository = templateRepository
	}

	async createTemplate({ name, html }) {
		return await templateRepository.createTemplate({
			name,
			html,
		})
	}

	getTemplate() {}
}

module.exports = new TemplateService()
