class TemplateRepository {
	constructor() {
		this.model = require('../models/template.model')
	}

	async createTemplate({ name, html }) {
		return await this.model.create({ name, html })
	}

	async getTemplateByName({ name }) {
		return await this.model.findOne({ name })
	}
}

module.exports = new TemplateRepository()
