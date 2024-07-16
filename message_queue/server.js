'use strict'

const { consumerToQueue } = require('./src/services/consumer.service')

const queueName = 'test_topic'

consumerToQueue(queueName, (message) => {
	console.log(`Received message: ${message}`)
})
	.then(() => {
		console.log('Consumer started')
	})
	.catch((err) => console.log(err))
