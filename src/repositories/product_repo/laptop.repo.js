const laptopModel = require('../../models/product_schema/laptop')

class laptopRepository {
	async createSmartphoneAtrribute(attributes) {
		return await laptopModel.create(attributes)
	}
}

module.exports = new laptopRepository()
