const amqp = require('amqplib')

const sendEmail = async () => {
	try {
		const conn = await amqp.connect('amqp://guest:123456@localhost')

		const channel = await conn.createChannel()

		const exchangeName = 'send_email'

		await channel.assertExchange(exchangeName, 'topic', {
			durable: true,
		})

		const messages = [
			{ key: 'quick.orange.rabbit', msg: 'Message for quick.orange.rabbit' },
			{ key: 'lazy.brown.fox', msg: 'Message for lazy.brown.fox' },
			{ key: 'quick.brown.fox', msg: 'Message for quick.brown.fox' },
			{ key: 'lazy.orange.elephant', msg: 'Message for lazy.orange.elephant' },
		]

		messages.forEach(({ key, msg }) => {
			channel.publish(exchangeName, key, Buffer.from(msg))
		})
	} catch (err) {
		console.log(err)
	}
}

sendEmail()
