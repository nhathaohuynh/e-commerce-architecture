'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const CHECK_INTERVAL = 5000

const countConnect = () => {
	const numberConnection = mongoose.connections.length
	console.log(`Number of connections: ${numberConnection}`)
}

const checkOverload = () => {
	setInterval(() => {
		const numberCors = os.cpus().length
		const numberConnections = mongoose.connections.length
		const memoryUsage = process.memoryUsage().rss

		const maxConnections = numberCors * 5

		console.log('Memory usage: ', memoryUsage / 1024 / 1024, 'MB')

		if (numberConnections > maxConnections) {
			console.error(`Number of connections is overloading`)
			process.exit(1)
		}
	}, CHECK_INTERVAL) // Monitor every 5 seconds
}

module.exports = {
	countConnect,
	checkOverload,
}
