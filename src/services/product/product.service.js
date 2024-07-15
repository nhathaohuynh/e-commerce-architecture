class ProductService {
	constructor() {
		this.productRepository = require('../../repositories/product_repo/product.repo')
	}

	async createProduct(product) {
		await this.productRepository.createProduct(product)
	}
}

module.exports = ProductService
