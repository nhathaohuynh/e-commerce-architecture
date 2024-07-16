'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'Laptops'
const DOCUMENT_NAME = 'Laptop'

const electronicSChema = new Schema(
	{
		brand: {
			type: String,
			required: true,
		},
		screen: {
			type: String,
			required: true,
		},

		RAM: {
			type: String,
			required: true,
		},

		camera: {
			type: String,
			required: true,
		},

		storage: {
			type: String,
			required: true,
		},

		operate_system: {
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

module.exports = model(DOCUMENT_NAME, electronicSChema)
