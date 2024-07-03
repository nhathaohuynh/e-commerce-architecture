'use strict'

const { Schema, model } = require('mongoose')

const COLLECTION_NAME = 'KeyTokens'
const DOCUMENT_NAME = 'KeyToken'

const KeyTokenSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		publicKey: {
			type: String,
			required: true,
		},

		refreshToken: {
			typpe: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const keyTokenModel = model(DOCUMENT_NAME, KeyTokenSchema)

module.exports = keyTokenModel
