const ProductService = require('./product.service')
class SmartphoneService extends ProductService {
	constructor() {
		this.smartphoneRepository = require('../../repositories/product_repo/smartphone.repo')
	}

	async createProduct(payload) {
		const smartphoneAttrbutes =
			await this.smartphoneRepository.createSmartphoneAtrribute(
				payload.attributes,
			)
		await super.createProduct(payload)
	}
}

module.exports = new SmartphoneService()
