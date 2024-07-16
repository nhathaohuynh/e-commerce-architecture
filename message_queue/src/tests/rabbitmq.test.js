const { connectionToRabbitMQForTest } = require('../db/init.rabibt')

describe('RabbitMQ', () => {
	it('should connect to RabbitMQ', async () => {
		const result = await connectionToRabbitMQForTest()
		expect(result).toBeUndefined()
	})
})
