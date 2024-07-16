'use strict'

const RabbitMQ = require('../databases/init.message-queue')

class ProducerService {
	async sendToQueue(queueName, message) {
		try {
			const { channel } = await RabbitMQ.getInstanceRabbit()

			await channel.assertQueue(queueName, { durable: true })

			channel.sendToQueue(queueName, Buffer.from(message))

			console.log(`Message sent to queue ${queueName}: ${message}`)
		} catch (err) {
			console.log(err)
			RabbitMQ.reconnect()
		}
	}
}

module.exports = new ProducerService()
