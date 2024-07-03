'use strict'

const mongoose = require('mongoose')
const { STATUS, ROLES } = require('../constants')

const COLLECTION_NAME = 'Users'
const DOCUMENT_NAME = 'User'

var userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxLength: 150,
		},

		email: {
			type: String,
			required: true,
			unique: true,
		},

		password: {
			type: String,
			required: true,
		},

		status: {
			type: String,
			enum: STATUS,
			default: STATUS[0],
		},

		verify: {
			type: Boolean,
			default: false,
		},

		roles: {
			type: Array,
			default: [ROLES[0]],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const userModel = mongoose.model(DOCUMENT_NAME, userSchema)

module.exports = userModel
