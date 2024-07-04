const redis = require('redis')
const { BadRequest } = require('../cores/custom-http-response/response.error')

const STATUSREDIS = {
	CONNECT: 'connect',
	END: 'end',
	RECONNECT: 'reconnecting',
	ERROR: 'error',
}

let client = {}

const REDIS_CONNECT_TIMEOUT = 10000
const REDIS_CONNECT_MESSAGE = {
	code: -999,
	message: 'Service connection error',
}

const handleEventConnectRedis = (connectionRedis) => {
	connectionRedis.connect()

	connectionRedis.on(STATUSREDIS.CONNECT, () => {
		console.log('Redis connection status: connected')
	})

	connectionRedis.on(STATUSREDIS.END, () => {
		console.log('Redis connection status: end')
	})

	connectionRedis.on(STATUSREDIS.ERROR, () => {
		console.log('Redis connection status: error')
	})

	connectionRedis.on(STATUSREDIS.RECONNECT, () => {
		console.log('Redis connection status: reconnecting')
	})
}

const initRedis = async () => {
	const instanceRedis = redis.createClient()

	client.instanceConnect = instanceRedis
	handleEventConnectRedis(instanceRedis)
}

const getRedis = () => client

const closeRedis = () =>
	client.instanceConnect.quit(() => {
		console.log('Redis client disconnected')
	})

module.exports = {
	initRedis,
	getRedis,
	closeRedis,
}
