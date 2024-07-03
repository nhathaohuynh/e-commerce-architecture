const app = require('./src/app')
const config_env = require('./src/configs/config-env')

const server = app.listen(config_env.app.port, () => {
	console.log(`Server is running on port: ${server.address().port}`)
})

// when user enter ctrl+c
process.on('SIGINT', () => {
	server.close(() => {
		console.log('Server closed')

		// notify the system that the server is closed

		// notify.send("Server closed")

		process.exit(0)
	})
})
