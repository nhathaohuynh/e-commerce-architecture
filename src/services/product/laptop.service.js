const ProductService = require('./product.service')
class LaptopService extends ProductService {
	constructor() {
		this.laptopRepository = require('../../repositories/product_repo/laptop.repo')
	}

	async createProduct(payload) {
		const laptopAttrbutes =
			await this.laptopRepository.createSmartphoneAtrribute(payload.attributes)

		await super.createProduct(payload)
	}
}

module.exports = new LaptopService()
