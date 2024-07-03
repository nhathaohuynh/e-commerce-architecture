const keyTokenModel = require('../models/keyToken.model')

class KeyTokenRepository {
	async createKeyToken({ user, publicKey }) {
		return await keyTokenModel.create({ user, publicKey })
	}

	async findOneAndUpdateToken(filter, update, options) {
		return await keyTokenModel.findOneAndUpdate(filter, update, options)
	}

	async findKeyTokenByUserID(userID) {
		return await keyTokenModel.findOne({ user: userID })
	}

	async removeKeyTokenByUserID(userId) {
		return await keyTokenModel.deleteOne({ user: userId })
	}
}

module.exports = new KeyTokenRepository()
