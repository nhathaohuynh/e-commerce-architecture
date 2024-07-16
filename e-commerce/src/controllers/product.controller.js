const {
	CreatedResponse,
	OKResponse,
} = require('../cores/custom-http-response/response.success')
const { templateService, productFactory } = require('../services')
class ProductController {
	async createProduct(req, res) {
		const { type } = req.body

		return new CreatedResponse({
			message: 'Product created successfully',
			metaData: await productFactory.createProduct({
				productType: type,
				payload: {
					...req.body,
					shopID: req.user.id,
				},
			}),
		}).send(res)
	}

	async getListProduct(req, res) {
		return new OKResponse({
			metaData: await templateService.getListTemplate(),
		}).send(res)
	}

	async updateProduct() {
		return new OKResponse({
			metaData: await templateService.updateTemplate(),
		}).send(res)
	}

	async removeProduct(req, res) {
		console.log('id', req.params.id)
		return new OKResponse({
			metaData: await templateService.removeTemplate(req.params.id),
		}).send(res)
	}
}

module.exports = new ProductController()
