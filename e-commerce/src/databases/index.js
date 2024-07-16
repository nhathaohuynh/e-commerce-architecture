'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check-connect')
const redisInstance = require('./init.redis')
const { db } = require('../configs/config-env')

class Database {
	constructor() {
		this.connect()
		this.connect('redis')
	}

	connect(type = 'mongo') {
		// convert to simepl factory connect db
		switch (type) {
			case 'mongo':
				this.connectMongo()
				break
			case 'redis':
				this.connectRedis()
				break
			default:
				console.log('Type database not found')
		}
	}

	connectMongo() {
		if (1 === 1) {
			mongoose.set('debug', true)
			mongoose.set('debug', { color: true })
		}
		mongoose
			.connect(db.mongo_url)
			.then((_) => {
				console.log('Connected to database')
				countConnect()
			})
			.catch((_) => console.log('Failed to connect to database'))
	}

	connectRedis() {
		redisInstance.getClient()
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
