const productModel = require('../../models/product_schema/product')

class ProductRepository {
	async createProduct(product) {
		return await productModel.create(product)
	}
}

module.exports = new ProductRepository()
