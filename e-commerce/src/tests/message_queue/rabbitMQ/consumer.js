const amqp = require('amqplib')

const runConsumer = async () => {
	try {
		const connectoion = await amqp.connect('amqp://guest:123456@localhost')
		const channel = await connectoion.createChannel()

		const queueName = 'test-topic'

		channel.assertQueue(queueName, {
			durable: true,
		})

		channel.consume(
			queueName,
			(message) => {
				console.log(`Received message: ${message.content.toString()}`)
			},
			{
				noAck: true,
			},
		)
	} catch (err) {
		console.log(err)
	}
}

runConsumer().catch(console.error)
