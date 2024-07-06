const { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX_REQUESTS } = require('../constants')
const {
	TooManyRequest,
	InternalServerError,
} = require('../cores/custom-http-response/response.error')
const { getClient: redisClient } = require('../databases/init.redis')

const rateLimiter = (req, res, next) => {
	const userIp = req.ip

	redisClient()
		.multi()
		.incr(userIp)
		.expire(userIp, RATE_LIMIT_WINDOW)
		.exec((err, replies) => {
			if (err) {
				throw new InternalServerError()
			}

			const requests = replies[0]
			if (requests > RATE_LIMIT_MAX_REQUESTS) {
				throw new TooManyRequest()
			}

			next()
		})
}

module.exports = rateLimiter
