const {
	CreatedResponse,
	NoContentResponse,
	OKResponse,
} = require('../cores/custom-http-response/response.success')
const { userService } = require('../services')

class UserController {
	async login(req, res, _) {
		return new OKResponse({
			message: 'Login success',
			metaData: {
				data: await userService.login(req.body),
			},
		}).send(res)
	}

	async register(req, res, next) {
		const metaData = await userService.register(req.body)

		return new NoContentResponse({
			metaData,
		}).send(res)
	}

	async verifyEmail(req, res) {
		const metaData = await userService.verifyEmail(req.query.token)

		return new CreatedResponse({
			metaData,
		}).send(res)
	}

	async refreshToken(req, res) {
		const metaData = await userService.refreshToken(req.user, req.refreshToken)

		return new OKResponse({
			metaData,
		}).send(res)
	}

	async logout(req, res) {
		return new OKResponse({
			metaData: await userService.logout(req.user),
		}).send(res)
	}
}

module.exports = new UserController()
