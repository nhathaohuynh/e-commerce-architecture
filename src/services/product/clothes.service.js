const {
	BadRequest,
} = require('../../cores/custom-http-response/response.error')
const ProductService = require('./product.service')

class ClothesService extends ProductService {
	constructor() {
		super()
		this.clothesRepository = require('../../repositories/product_repo/clothes.repo')
	}

	async createProduct(payload) {
		const clothAttrbutes = await this.clothesRepository.createClothesAtrribute(
			payload.attributes,
		)

		if (!clothAttrbutes) throw new BadRequest('Invalid clothes attributes')

		await super.createProduct(payload)
	}
}

module.exports = new ClothesService()
