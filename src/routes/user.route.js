'use strict'

const { PERMISSIONS } = require('../constants')
const { userController } = require('../controllers')
const asyncHandler = require('../middleware/async-handler')
const { checkAPIKey, checkPermission } = require('../middleware/check-api-key')
const validate = require('../middleware/validate')
const {
	userRegisterSchema,
	userVerifyEmailSchema,
} = require('../validators/user.validator')

const route = require('express').Router()

route.use(checkAPIKey)
route.use(checkPermission(PERMISSIONS[0]))

route.post('/login', asyncHandler(userController.login))

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

module.exports = route
