const { HEADER } = require('../constants')
const asyncHandler = require('./async-handler')
const {
	UnauthorizedError,
} = require('../cores/custom-http-response/response.error')
const { verifyToken } = require('../utils')
const keyTokenService = require('../services/keyToken.service')

module.exports = {
	authentication: asyncHandler(async (req, res, next) => {
		const userID = req.headers[HEADER.CLIENT_ID]

		if (!userID) {
			throw next(new UnauthorizedError())
		}

		const keyTokens = await keyTokenService.findKeyTokenByUserID(userID)

		if (!keyTokens) {
			throw next(new UnauthorizedError())
		}

		console.log(req.headers)

		const accessToken = req.headers[HEADER.AUTHORIZATION].split(' ')[1]

		if (!accessToken) {
			throw next(new UnauthorizedError())
		}

		const decodedUser = verifyToken({
			token: accessToken,
			key: keyTokens.publicKey,
		})

		console.log(decodedUser)

		if (!decodedUser || decodedUser?.user?.id !== userID) {
			throw next(new UnauthorizedError())
		}

		req.user = decodedUser.user

		return next()
	}),

	authenticationAccessToken: asyncHandler(async (req, res, next) => {
		const userID = req.headers[HEADER.CLIENT_ID]

		if (!userID) {
			throw next(new UnauthorizedError())
		}

		const keyTokens = await keyTokenService.findKeyTokenByUserID(userID)

		if (!keyTokens) {
			throw next(new UnauthorizedError())
		}

		const refreshToken = req.headers[HEADER.REFRESH_TOKEN]

		if (!refreshToken) {
			throw next(new UnauthorizedError())
		}

		const decodedUser = verifyToken({
			token: refreshToken,
			key: keyTokens.publicKey,
		})

		console.log(decodedUser)

		if (!decodedUser || decodedUser?.user?.id !== userID) {
			throw next(new UnauthorizedError())
		}

		req.user = decodedUser.user

		return next()
	}),
}
