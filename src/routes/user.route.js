'use strict'

const { PERMISSIONS } = require('../constants')
const { userController } = require('../controllers')
const asyncHandler = require('../middleware/async-handler')
const {
	authentication,
	authenticationRefreshToken,
} = require('../middleware/authentication')
const { checkAPIKey, checkPermission } = require('../middleware/check-api-key')
const { validate } = require('../middleware/validate')
const {
	userRegisterSchema,
	userVerifyEmailSchema,
	userLoginSchema,
} = require('../validators/user.validator')

const route = require('express').Router()

route.use(checkAPIKey)
route.use(checkPermission(PERMISSIONS[0]))

route.post(
	'/login',
	validate(userLoginSchema),
	asyncHandler(userController.login),
)

route.post(
	'/register',
	validate(userRegisterSchema),
	asyncHandler(userController.register),
)

route.get(
	'/verify-email',
	validate(userVerifyEmailSchema),
	asyncHandler(userController.verifyEmail),
)

route.delete(
	'/refresh-token',
	authenticationRefreshToken,
	asyncHandler(userController.refreshToken),
)
// authenticate user
route.use(authentication)

route.delete('/logout', asyncHandler(userController.logout))

module.exports = route
