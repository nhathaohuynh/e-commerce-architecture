const { HEADER } = require('../constants')
const {
	ForbiddenError,
} = require('../cores/custom-http-response/response.error')
const { apiKeyRepository } = require('../repositories')

const checkAPIKey = async (req, res, next) => {
	const key = req.headers[HEADER.API_KEY]

	if (!key) {
		return next(new ForbiddenError())
	}

	const objKey = await apiKeyRepository.findAPiIKeyByKey(key)

	if (!objKey) {
		return next(new ForbiddenError())
	}

	req.objKey = objKey

	return next()
}

const checkPermission = (permission) => {
	return (req, res, next) => {
		if (!req.objKey.permissions) {
			return next(new ForbiddenError('Permission denied'))
		}

		const validPermission = req.objKey.permissions.includes(permission)

		if (!validPermission) {
			return next(new ForbiddenError('Permission denied'))
		}

		return next()
	}
}
module.exports = { checkAPIKey, checkPermission }
