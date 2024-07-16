'use strict'

const amqp = require('amqplib')

class ConnectRabbitMQ {
	constructor() {
		this.connection = null
		this.channel = null
		this.isConnecting = false
		this.retryTimeout = 5000 // Retry connection every 5 seconds
		this.maxRetries = 10
		this.retryCount = 0
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
				this.reconnect()
			})

			this.connection.on('close', () => {
				console.warn('RabbitMQ connection closed')
				this.reconnect()
			})

			this.channel = await this.connection.createChannel()
			console.log('RabbitMQ connection established')
			this.retryCount = 0 // Reset retry count on successful connection
		} catch (err) {
			console.error('RabbitMQ connection error:', err)
			this.reconnect()
		} finally {
			this.isConnecting = false
		}
	}

	async reconnect() {
		if (this.retryCount >= this.maxRetries) {
			console.error(
				'Maximum reconnect attempts reached. Stopping reconnection attempts.',
			)
			return
		}

		this.connection = null
		this.channel = null
		this.retryCount++
		console.log(
			`Reconnecting to RabbitMQ in ${
				this.retryTimeout / 1000
			} seconds... Attempt ${this.retryCount}/${this.maxRetries}`,
		)
		setTimeout(() => this.connect(), this.retryTimeout)
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

module.exports = new ConnectRabbitMQ()
