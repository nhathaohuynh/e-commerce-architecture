'use strict'

/**
 * @Author: Huynh Nhat Hao
 * @Date:   2024-06-24
 * @LastEditor: Huynh Nhat Hao
 * @Path: src/models/template.model.js
 */

const { model, Schema } = require('mongoose')
const { USER_STATUS } = require('../constants')

const COLLECTION_NAME = 'Otp_logs'
const DOCUMENT_NAME = 'Otp_log'
const EXPIRE_TIME = '2m'

const otpShema = new Schema(
	{
		otpToken: {
			type: String,
			required: true,
		},
		otpEmail: {
			type: String,
			required: true,
		},

		otpStatus: {
			type: String,
			default: USER_STATUS[0],
			enum: USER_STATUS,
		},

		expireAt: {
			type: Date,
			default: Date.now,
			index: { expires: EXPIRE_TIME },
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const otpModel = model(DOCUMENT_NAME, otpShema)

module.exports = otpModel
