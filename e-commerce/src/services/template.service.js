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

	async getListTemplate() {}

	async updateTemplate() {}

	async removeTemplate() {}
}

module.exports = new TemplateService()
