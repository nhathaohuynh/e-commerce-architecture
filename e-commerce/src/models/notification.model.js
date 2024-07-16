'use strict'

const { model, Schema } = require('mongoose')

const COLLECTION_NAME = 'Notifications'
const DOCUMENT_NAME = 'Notification'

const notificationSchema = new Schema(
	{
		type: {
			type: String,
			enum: ['ORDER-001', 'PROMOTION-001', 'SHOP-001'],
			required: true,
		},
		senderID: {
			type: number,
			required: true,
		},
		receiveID: {
			type: number,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},

		options: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

module.exports = model(DOCUMENT_NAME, notificationSchema)
