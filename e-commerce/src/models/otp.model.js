'use strict'

/**
 * @Author: Huynh Nhat Hao
 * @Date:   2024-06-24
 * @LastEditor: Huynh Nhat Hao
 * @Path: src/models/template.model.js
 */

const { model, Schema } = require('mongoose')
const { USER_STATUS, EXPIRED_TIME } = require('../constants')

const COLLECTION_NAME = 'OTPLogs'
const DOCUMENT_NAME = 'OTPLog'

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
			index: { expires: EXPIRED_TIME.VERIFY_EMAIL },
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const otpModel = model(DOCUMENT_NAME, otpShema)

module.exports = otpModel
