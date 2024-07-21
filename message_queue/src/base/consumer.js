const amqp = require('amqplib')

const consumer = async () => {
	const rabbit = await amqp.connect('amqp://guest:123456@localhost')

	const channel = await rabbit.createChannel()

	await channel.assertQueue('test_topic', { durable: true }) // durable: true mean that the queue will be persistent

	channel.consume(
		'test_topic',
		(message) => {
			console.log(`Received message: ${message.content.toString()}`)
		},
		{
			noAck: true, // no acknowledgment it mean that the message will be removed from the queue
		},
	)
}

consumer()
