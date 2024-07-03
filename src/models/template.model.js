'use strict'

/**
 * @Author: Huynh Nhat Hao
 * @Date:   2024-06-24
 * @LastEditor: Huynh Nhat Hao
 * @Path: src/models/template.model.js
 */

const { model, Schema } = require('mongoose')
const { STATUS } = require('../constants')

const COLLECTION_NAME = 'Templates'
const DOCUMENT_NAME = 'Template'

const templateShema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},

		status: {
			type: String,
			default: STATUS[1],
			enum: STATUS,
		},

		html: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)

const templateModel = model(DOCUMENT_NAME, templateShema)

module.exports = templateModel
