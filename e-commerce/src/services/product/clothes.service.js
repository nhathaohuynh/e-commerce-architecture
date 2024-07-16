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
		const shop = payload.shopID

		const attributes = {
			...payload.attributes,
			shop,
		}
		const clothAttrbutes = await this.clothesRepository.createClothesAtrribute(
			attributes,
		)

		if (!clothAttrbutes) throw new BadRequest('Invalid clothes attributes')

		await super.createProduct({
			...payload,
			_id: clothAttrbutes._id,
		})
	}
}

module.exports = new ClothesService()
