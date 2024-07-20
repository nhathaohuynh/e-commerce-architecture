'use strict'

const amqp = require('amqplib')

class OrderedProducerService {
	constructor() {
		this._connection = null
		this._channel = null
	}

	async producer() {
		try {
			await this.connect()

			const exchangeName = 'ordered-message'
			const orderQueue = 'order-queue'

			await this._channel.assertExchange(exchangeName, 'direct', {
				durable: true,
			})

			const { queue } = await this._channel.assertQueue(orderQueue, {
				exclusive: false,
			})

			await this._channel.bindQueue(queue, exchangeName)

			for (let index = 0; index < 10; index++) {
				const msg = 'Order queued message:: ' + index

				this._channel.sendToQueue(queue, Buffer.from(msg))
			}

			setTimeout(() => {
				this._connection.close()
				process.exit(0)
			}, 500)
		} catch (err) {
			console.log(err)
		}
	}

	async connect() {
		this._connection = await amqp.connect('amqp://guest:123456@localhost')
		this._channel = await this._connection.createChannel()
	}
}

module.exports = new OrderedProducerService()
