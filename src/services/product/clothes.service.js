const ProductService = require('./product.service')

class ClothesService extends ProductService {
	constructor() {
		this.clothesRepository = require('../../repositories/product_repo/clothes.repo')
	}

	async createProduct(payload) {
		const clothAttrbutes = await this.clothesRepository.createClothesAtrribute(
			payload.attributes,
		)

		await super.createProduct(payload)
	}
}

module.exports = new ClothesService()
