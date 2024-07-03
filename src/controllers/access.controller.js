const {
	Created,
	NoContent,
} = require('../cores/custom-http-response/response.success')
const { userService } = require('../services')

class UserController {
	async login(req, res, _) {
		return res.status(200).json({
			message: 'Login success',
		})
	}

	async register(req, res, next) {
		const metaData = await userService.register(req.body)

		return new NoContent({
			metaData,
		}).send(res)
	}

	async verifyEmail(req, res) {
		const metaData = await userService.verifyEmail(req.query.token)

		return new Created({
			metaData,
		}).send(res)
	}
}

module.exports = new UserController()
