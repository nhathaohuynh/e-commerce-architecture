const bcrypt = require('bcryptjs')
const { SALT_NUMBER } = require('../constants')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

module.exports = {
	generateSalt: async () => {
		return await bcrypt.genSalt(SALT_NUMBER)
	},

	hashPassword: async (password, salt) => {
		return await bcrypt.hash(password, salt)
	},

	getFieldsOfObject: (obj = {}, fields = []) => {
		return _.pick(obj, fields)
	},

	generateToken: ({ user, privateKey, expirseIn }) => {
		return jwt.sign({ user }, privateKey, {
			expiresIn: expirseIn,
			algorithm: 'RS256',
		})
	},

	verifyToken: ({ token, key }) => {
		return jwt.verify(token, key)
	},

	generatorTokenRandom: () => {
		return crypto.randomInt(0, Math.pow(2, 32))
	},

	replacePlaceholder: (template, params) => {
		Object.keys(params).forEach((key) => {
			const placeholder = `{{${key}}}`
			template = template.replace(new RegExp(placeholder, 'g'), params[key])
		})

		return template
	},

	generateRandomPassword: (length = 8) => {
		// Define possible characters for the password
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@'

		// Initialize an array to hold the password characters
		let password = ''

		// Randomly select characters from the characters string
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length)
			password += characters[randomIndex]
		}

		return password
	},
}
