const ProductService = require('./product.service')
class SmartphoneService extends ProductService {
	constructor() {
		super()
		this.smartphoneRepository = require('../../repositories/product_repo/smartphone.repo')
	}

	async createProduct(payload) {
		const smartphoneAttribute =
			await this.smartphoneRepository.createSmartphoneAtrribute(
				payload.attributes,
			)

		if (!smartphoneAttribute)
			throw new BadRequest('Invalid smartphone attributes')
		await super.createProduct(payload)
	}
}

module.exports = new SmartphoneService()
