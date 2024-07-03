'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check-connect')
const connectString = 'mongodb://localhost:27017/e-commerce'
class Database {
	constructor() {
		this.connect()
	}

	connect(type = 'mongo') {
		if ((type = 'mongo')) {
			if (1 === 1) {
				mongoose.set('debug', true)
				mongoose.set('debug', { color: true })
			}
			mongoose
				.connect(connectString)
				.then((_) => {
					console.log('Connected to database')
					countConnect()
				})
				.catch((_) => console.log('Failed to connect to database'))
		}
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database()
		}

		return Database.instance
	}
}

const instanceMongoDB = Database.getInstance()

module.exports = instanceMongoDB
