const keyTokenModel = require('../models/keyToken.model')

class KeyTokenRepository {
	async createKeyToken({ user, publicKey }) {
		return await keyTokenModel.create({ user, publicKey })
	}
}

module.exports = new KeyTokenRepository()
