const amqp = require('amqplib')

const messages = 'hello, RabiitMQ for Huynh Nhat Hao user'

const runProducer = async () => {
	try {
		const connection = await amqp.connect('amqp://guest:123456@localhost')
		const channel = await connection.createChannel()

		const queueName = 'test-topic'

		channel.assertQueue(queueName, {
			durable: true, // make sure that the queue will survive after RabbitMQ is restarted
		})

		// send message to consumer channel

		channel.sendToQueue(queueName, Buffer.from(messages))
	} catch (err) {
		console.log(err)
	}
}

runProducer().catch(console.error)
