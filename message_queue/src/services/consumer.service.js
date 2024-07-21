const amqp = require('amqplib')

class Consumer {
	// async consumerToQueue(queueName, callback) {
	// 	try {
	// 		const { channel } = await RabbitMQ.getInstanceRabbit()
	// 		await channel.assertQueue(queueName, { durable: true })

	// 		channel.consume(queueName, (message) => {
	// 			if (message !== null) {
	// 				callback(message.content.toString())
	// 			}

	// 			channel.ack(msg)
	// 		})
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }

	// cause processing message

	async consumerToQueueNormal() {
		const conn = await amqp.connect('amqp://guest:123456@localhost')
		const channel = await conn.createChannel()

		const notiExchange = 'notificationEx'
		const notiQueue = 'notificationQueueProcess'
		const notiExchangeDLX = 'notificationExDLX'
		const notiRoutingKeyDLX = 'notificationDLX'

		channel.consume(notiQueue, (message) => {
			try {
				// ============ Resolve TIME TO LIVE (TTL)==================
				// setTimeout(() => {
				// 	if (message !== null) {
				// 		console.log(
				// 			'Send recived from normal ' + message.content.toString(),
				// 		)
				// 	}
				// 	channel.ack(message) // acknowledge the message
				// }, 60000)

				// =============Resolve ERROR LOGGIC=============

				const number = Math.random()
				console.log(number)
				if (number < 0.8) {
					throw new Error('Error')
				}

				if (message !== null) {
					console.log('Send recived from normal ' + message.content.toString())
					return channel.ack(message) // acknowledge the message
				}

				return new Error('Error')
			} catch (err) {
				// console.log(err)
				channel.nack(message, false, false)
				// nack(msg, allUpTo, requeue)
				// msg: The message to be negatively acknowledged.
				// allUpTo: If true, all messages up to and including this one will be negatively acknowledged. If false, only the specified message is negatively acknowledged.
				// requeue: If true, the message will be requeued and made available to other consumers. If false, the message will be discarded (or sent to a dead-letter exchange if configured).
			}
		})
	}

	async consumerToQueueFailed() {
		try {
			const conn = await amqp.connect('amqp://guest:123456@localhost')
			const channel = await conn.createChannel()

			const notiQueueHandler = 'notiQuueHotFix'
			const notiExchange = 'notificationEx'
			const notiQueue = 'notificationQueueProcess'
			const notiExchangeDLX = 'notificationExDLX'
			const notiRoutingKeyDLX = 'notificationDLX'

			await channel.assertExchange(notiExchangeDLX, 'direct', {
				durable: true,
			}) // create an exchange that will be used to handle the message that is dead

			const { queue } = await channel.assertQueue(notiQueueHandler, {
				exclusive: false,
			}) // create a queue that will be used to handle the message that is dead

			await channel.bindQueue(queue, notiExchangeDLX, notiRoutingKeyDLX) // bind the queue with the exchange

			channel.consume(
				queue,
				(message) => {
					if (message !== null) {
						console.log(
							'Send recived from hot fix ' + message.content.toString(),
						)
					}
				},
				{
					noAck: true,
				},
			)
		} catch (err) {
			console.log(err)
		}
	}
}

module.exports = new Consumer()
