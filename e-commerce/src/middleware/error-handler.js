const { writeLogEndRequest } = require('./write-log')

module.exports = {
	errorHandler: (err, req, res, next) => {
		const statusCode = err.status || 500
		const message = err.message || 'Internal Server Error'

		writeLogEndRequest(err, req, res, next)

		return res.status(statusCode).json({
			status: 'error',
			message,
			stack: err.stack,
		})
	},
}
