const { RabbitMQ } = require('../db/init.rabibt')

class Consumer {
	async consumer(queueName, callback) {
		try {
			const { channel } = await new RabbitMQ().getInstanceRabbit()
			await channel.assertQueue(queueName, { durable: true })

			channel.consume(
				queueName,
				(message) => {
					console.log(message)
					if (msg !== null) {
						console.log(
							`Received message from queue ${queueName}: ${message.content.toString()}`,
						)
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
