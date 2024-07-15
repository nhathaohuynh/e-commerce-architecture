const smartphoneModel = require('../../models/product_schema/smartphone')

class smartphoneRepository {
	async createSmartphoneAtrribute(attributes) {
		return await smartphoneModel.create(attributes)
	}
}

module.exports = new smartphoneRepository()
