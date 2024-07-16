const ProductService = require('./product.service')
class SmartphoneService extends ProductService {
	constructor() {
		super()
		this.smartphoneRepository = require('../../repositories/product_repo/smartphone.repo')
	}

	async createProduct(payload) {
		const shop = payload.shopID

		const attributes = {
			...payload.attributes,
			shop,
		}
		const smartphoneAttribute =
			await this.smartphoneRepository.createSmartphoneAtrribute(attributes)

		if (!smartphoneAttribute)
			throw new BadRequest('Invalid smartphone attributes')
		await super.createProduct({ ...payload, _id: smartphoneAttribute._id })
	}
}

module.exports = new SmartphoneService()
