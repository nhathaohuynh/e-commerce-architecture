const smartphoneService = require('./smartphone.service')
const laptopService = require('./laptop.service')
const clothesService = require('./clothes.service')
const {
	BadRequest,
} = require('../../cores/custom-http-response/response.error')
const { PRODUCT_TYPE } = require('../../constants')

class ProductFactory {
	productRegistry = {}

	async createProduct({ productType, payload }) {
		const productClass = this.productRegistry[productType]

		if (!productClass) {
			throw new BadRequest('Invalid product type')
		}
		return await productClass.createProduct(payload)
	}

	registerProductType(type, refClass) {
		this.productRegistry[type] = refClass
	}
}

const ProductFactoryInstance = new ProductFactory()

ProductFactoryInstance.registerProductType(
	PRODUCT_TYPE.SMARTPHONE,
	smartphoneService,
)
ProductFactoryInstance.registerProductType(PRODUCT_TYPE.LAPTOP, laptopService)
ProductFactoryInstance.registerProductType(
	PRODUCT_TYPE.CLOTHING,
	clothesService,
)

module.exports = ProductFactoryInstance
