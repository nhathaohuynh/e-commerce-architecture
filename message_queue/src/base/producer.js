const amqp = require('amqplib')

const producer = async () => {
	try {
		const rabbit = await amqp.connect('amqp://guest:123456@localhost')

		const channel = await rabbit.createChannel()

		await channel.assertQueue('test_topic', { durable: true })

		channel.sendToQueue(
			'test_topic',
			Buffer.from('Hello World! I am Huynh Nhat Hao'),
			{
				persistent: true,
			},
		)
	} catch (err) {
		console.log(err)
	}
}

producer()
