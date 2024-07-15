const smartphoneService = require('./smartphone.service')
const laptopService = require('./laptop.service')
const clothesService = require('./clothes.service')

class ProductFactory {
	async createProduct(productType, payload) {
		const product = this.getProduct(productType)
		await product.createProduct(payload)
	}

	getProduct(productType) {
		switch (productType) {
			case 'smartphone':
				return smartphoneService

			case 'laptop':
				return laptopService

			case 'clothes':
				return clothesService

			default:
				throw new Error('Invalid product type')
		}
	}
}

module.exports = new ProductFactory()
