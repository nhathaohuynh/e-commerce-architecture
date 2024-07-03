'use strict'

const { model, Schema } = require('mongoose')
const { PERMISSIONS } = require('../constants')

const COLLECTION_NAME = 'ApiKeys'
const DOCUEMNT_NAME = 'ApiKey'

const ApiKeySchema = new Schema({
	key: {
		type: String,
		required: true,
		unique: true,
	},

	status: {
		type: Boolean,
		default: true,
	},

	permissions: {
		type: [String],
		required: true,
		enum: PERMISSIONS,
	},
})

const apiKeyModel = model(DOCUEMNT_NAME, ApiKeySchema, COLLECTION_NAME)

module.exports = apiKeyModel
