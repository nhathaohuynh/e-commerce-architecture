const amqp = require('amqplib')

const receiveEmail = async () => {
	try {
		const conn = await amqp.connect('amqp://guest:123456@localhost')
		const channel = await conn.createChannel()

		const exchangeName = 'send_email'

		await channel.assertExchange(exchangeName, 'topic', {
			durable: true,
		})

		const { queue } = await channel.assertQueue('', { exclusive: true })

		const args = process.argv.slice(2)

		// if (!args.length < 2) {
		// 	process.exit(0)
		// }

		// bindding queue with topic

		/**
		 *   *  * (star) can substitute for exactly one word.
		 *   *  # (hash) can substitute for zero or more words.
		 */

		console.log(args)

		args.forEach((key) => {
			channel.bindQueue(queue, exchangeName, key)
		})

		channel.consume(
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

receiveEmail()
