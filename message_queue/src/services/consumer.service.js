const { RabbitMQ } = require('../db/init.rabibt')

class Consumer {
	async consumerToQueue(queueName, callback) {
		try {
			const { channel } = await RabbitMQ.getInstanceRabbit()
			await channel.assertQueue(queueName, { durable: true })

			channel.consume(
				queueName,
				(message) => {
					if (message !== null) {
						callback(message.content.toString())
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
