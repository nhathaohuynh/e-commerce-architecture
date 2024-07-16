'use strict'

const { model, Schema } = require('mongoose')
const { SIZE } = require('../../constants')

const COLLECTION_NAME = 'Clothes'
const DOCUMENT_NAME = 'Clothes'

// schema define for private of clothes product
const clothisSchema = new Schema(
	{
		brand: {
			type: String,
			required: true,
		},
		color: {
			type: [String],
			required: true,
		},
		size: {
			type: String,
			required: true,
			enum: SIZE,
		},
		material: {
			type: String,
			required: true,
		},
		shop: {
			type: Schema.Types.ObjectId,
			ref: 'Shop',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, clothisSchema)
