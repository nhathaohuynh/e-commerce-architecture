'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'Smartphones'
const DOCUMENT_NAME = 'Smartphone'

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

		hard_drive: {
			type: String,
			required: true,
		},

		microprocessor: {
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
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, electronicSChema)
