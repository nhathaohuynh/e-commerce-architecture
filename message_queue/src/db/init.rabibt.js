'use strict'

const amqp = require('amqplib')

class ConnectRabbitMQ {
	constructor() {
		this.connection = null
		this.channel = null
		this.isConnecting = false
	}

	async connect() {
		if (this.isConnecting) {
			return
		}

		this.isConnecting = true

		try {
			this.connection = await amqp.connect('amqp://guest:123456@localhost')

			if (!this.connection) {
				throw new Error('Cannot connect to RabbitMQ')
			}

			this.connection.on('error', (err) => {
				console.error('RabbitMQ connection error:', err)
				this.connection = null
				this.channel = null
				this.isConnecting = false
			})

			this.connection.on('close', () => {
				console.warn('RabbitMQ connection closed')
				this.connection = null
				this.channel = null
				this.isConnecting = false
			})

			this.channel = await this.connection.createChannel()
			console.log('RabbitMQ connection established')
		} catch (err) {
			console.error('RabbitMQ connection error:', err)
		} finally {
			this.isConnecting = false
		}
	}

	async getInstanceRabbit() {
		// Singleton pattern with retry logic
		if (!this.connection || !this.channel) {
			await this.connect()
		}

		if (!this.connection || !this.channel) {
			throw new Error('Failed to establish RabbitMQ connection')
		}

		return { channel: this.channel, connection: this.connection }
	}
}

const connectionToRabbitMQForTest = async () => {
	try {
		const { channel, connection } =
			await new ConnectRabbitMQ().getInstanceRabbit()
		const queueName = 'test-topic'
		const messages = 'hello, RabiitMQ for Huynh Nhat Hao user'

		await channel.assertQueue(queueName)
		channel.sendToQueue(queueName, Buffer.from(messages))

		connection.close()
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	connectionToRabbitMQForTest,
	RabbitMQ: new ConnectRabbitMQ(),
}
