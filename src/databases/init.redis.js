const redis = require('redis')
const { db } = require('../configs/config-env')
const { STATUS_REDIS } = require('../constants')

class RedisService {
	constructor() {
		this.client = redis.createClient(db.redis_url)
		this.connect()
	}

	connect() {
		this.setupEventHandler()
		this.client
			.connect()
			.then(() => {
				console.log('Redis connection status: connected')
			})
			.catch((err) => {
				console.error('Failed to connect to Redis:', err)
			})
	}

	static close() {
		this.getClient().quit(() => {
			console.log('Redis client disconnected')
		})
	}

	setupEventHandler() {
		this.client.on(STATUS_REDIS.END, () => {
			console.log('Redis connection status: ended')
		})

		this.client.on(STATUS_REDIS.ERROR, (err) => {
			console.log('Redis connection status: error', err)
		})

		this.client.on(STATUS_REDIS.RECONNECT, () => {
			console.log('Redis connection status: reconnecting')
		})
	}

	static getClient() {
		// singleton pattern
		if (!this.instance) {
			this.instance = new RedisService()
		}

		return this.instance.client
	}
}

module.exports = RedisService
