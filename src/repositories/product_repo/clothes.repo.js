const clothesModel = require('../../models/product_schema/clothes')

class ClothesRepository {
	async createClothesAtrribute(attributes) {
		return await clothesModel.create(attributes)
	}
}

module.exports = new ClothesRepository()
