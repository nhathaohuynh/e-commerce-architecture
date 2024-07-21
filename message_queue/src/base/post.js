const amqp = require('amqplib')

const postVideo = async () => {
	try {
		const conn = await amqp.connect('amqp://guest:123456@localhost')

		const channel = await conn.createChannel()

		const exchangeName = 'video'

		channel.assertExchange(exchangeName, 'fanout', { durable: true })

		const message = 'hello world I am Huynh Nhat Hao'

		channel.publish(exchangeName, '', Buffer.from(message))

		setTimeout(() => {
			conn.close()
			process.exit(0)
		}, 2000)
	} catch (err) {
		console.log(err)
	}
}

postVideo()
