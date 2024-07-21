const amqp = require('amqplib')

const notification = async () => {
	try {
		const conn = await amqp.connect('amqp://guest:123456@localhost')

		const channel = await conn.createChannel()

		const exchangeName = 'video'

		await channel.assertExchange(exchangeName, 'fanout', { durable: true })

		const { queue } = await channel.assertQueue('', { exclusive: true })

		console.log('queue', queue)

		await channel.bindQueue(queue, exchangeName, '')

		await channel.consume(
			queue,
			(message) => {
				console.log(message.content.toString())
			},
			{
				noAck: true,
			},
		)
	} catch (err) {
		console.log(err)
	}
}

notification()
