'use strict'

const userModel = require('../models/user.model')

class UserRepository {
	async findUserByEmail(email) {
		return await userModel.findOne({ email: email }).lean()
	}

	async createUser({ email, name, password }) {
		return await userModel.create({ email, name, password })
	}
}

module.exports = new UserRepository()
