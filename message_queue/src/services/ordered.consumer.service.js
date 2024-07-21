const amqp = require('amqplib')

class OrderedConsumerSerivce {
	constructor() {
		this._connection = null
		this._channel = null
	}

	async consumer() {
		await this.connect()

		// const exchangeName = 'ordered-message'
		const orderQueue = 'order-queue'

		this._channel.prefetch(1) // This will make sure that the consumer will only receive one message at a time

		this._channel.consume(orderQueue, (message) => {
			setTimeout(async () => {
				console.log('Received message:', message.content.toString())
				this._channel.ack(message)
			}, Math.random() * 1000)
		})
	}

	async connect() {
		this._connection = await amqp.connect('amqp://guest:123456@localhost')
		this._channel = await this._connection.createChannel()
	}
}

module.exports = new OrderedConsumerSerivce()
