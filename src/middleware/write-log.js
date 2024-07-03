const { HEADER } = require('../constants')
const Logger = require('../loggers')
const crypto = require('crypto')

module.exports = {
	writeLogStartRequest: (req, res, next) => {
		const requestID = req.header[HEADER.REQUEST_ID]

		req.requestID = requestID ? requestID : crypto.randomUUID()

		Logger.log(`Input params::${req.method}`, [
			req.path,
			req.requestID,
			req.method === 'GET' ? req.query : req.body,
		])

		next()
	},

	writeLogEndRequest: (err, req, res, next) => {
		Logger.error(err.message, [
			req.path,
			req.requestID,
			{
				message: `${err.status} - ${
					Date.now() - err.now
				}ms - response: ${JSON.stringify(err.message)}`,
			},
		])

		next()
	},
}
