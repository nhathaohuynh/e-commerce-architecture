'use strict'

const { Schema, model } = require('mongoose')
const COLLECTION_NAME = 'Products'
const DOCUMENT_NAME = 'Product'

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		thumbnail: {
			type: String,
			required: true,
		},

		images: {
			type: String,
		},

		description: String,

		price: {
			type: Number,
			required: true,
		},

		quantity: {
			type: Number,
		},

		type: {
			type: String,
			required: true,
		},

		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},

		shopID: String,

		attributes: {
			type: Schema.Types.Mixed,
			require: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, productSchema)
