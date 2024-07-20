const amqp = require('amqplib')

class producerDLX {
	constructor() {
		this.notiExchange = 'notificationEx'
		this.notiQueue = 'notificationQueueProcess'
		this.notiExchangeDLX = 'notificationExDLX'
		this.notiRoutingKeyDLX = 'notificationDLX'
		this.connection = null
		this.channel = null
	}

	async connect() {
		this.connection = await amqp.connect('amqp://guest:123456@localhost')
		this.channel = await this.connection.createChannel()
	}
	async sendToQueue() {
		await this.connect()
		await this.channel.assertExchange(this.notiExchange, 'direct', {
			durable: true,
		})

		const { queue } = await this.channel.assertQueue(this.notiQueue, {
			exclusive: false, // exclusive: false mean that the queue will be persistent
			deadLetterExchange: this.notiExchangeDLX, // deadLetterExchange: the exchange that the message will be sent to when it is dead
			deadLetterRoutingKey: this.notiRoutingKeyDLX, // deadLetterRoutingKey: the routing key that the message will be sent to when it is dead
		})

		await this.channel.bindQueue(queue, this.notiExchange)

		const msg = 'a new product has been added'

		this.channel.sendToQueue(queue, Buffer.from(msg), {
			expiration: '10000', // expiration: the time that the message will be expired
		})

		this.close()
	}

	async close() {
		setTimeout(() => {
			this.connection.close()
			process.exit(0)
		}, 500)
	}
}

module.exports = new producerDLX()
