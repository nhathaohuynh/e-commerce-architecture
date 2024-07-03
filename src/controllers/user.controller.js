const {
	CreatedReponse,
	NoContentReponse,
	OKReponse,
} = require('../cores/custom-http-response/response.success')
const { userService } = require('../services')

class UserController {
	async login(req, res, _) {
		return new OKReponse({
			message: 'Login success',
			metaData: {
				data: await userService.login(req.body),
			},
		}).send(res)
	}

	async register(req, res, next) {
		const metaData = await userService.register(req.body)

		return new NoContentReponse({
			metaData,
		}).send(res)
	}

	async verifyEmail(req, res) {
		const metaData = await userService.verifyEmail(req.query.token)

		return new CreatedReponse({
			metaData,
		}).send(res)
	}

	async refreshToken(req, res) {
		const metaData = await userService.refreshToken(req.user)

		return new OKReponse({
			metaData,
		}).send(res)
	}

	async logout(req, res) {
		return new OKReponse({
			metaData: await userService.logout(req.user),
		}).send(res)
	}
}

module.exports = new UserController()
