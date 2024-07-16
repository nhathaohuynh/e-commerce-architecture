const {
	BadRequest,
} = require('../../cores/custom-http-response/response.error')
const ProductService = require('./product.service')
class LaptopService extends ProductService {
	constructor() {
		super()
		this.laptopRepository = require('../../repositories/product_repo/laptop.repo')
	}

	async createProduct(payload) {
		const shop = payload.shopID

		const attributes = {
			...payload.attributes,
			shop,
		}
		const laptopAttrbutes =
			await this.laptopRepository.createSmartphoneAtrribute(attributes)

		if (!laptopAttrbutes) {
			throw new BadRequest('Invalid laptop attributes')
		}

		await super.createProduct({ ...payload, _id: laptopAttrbutes._id })
	}
}

module.exports = new LaptopService()
