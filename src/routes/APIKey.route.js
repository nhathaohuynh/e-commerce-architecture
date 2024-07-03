const { APIKeyController } = require('../controllers')
const asyncHandler = require('../middleware/async-handler')
const validate = require('../middleware/validate')
const APIKeySchema = require('../validators/APIKey.validator')

const route = require('express').Router()

route.post(
	'/',
	validate(APIKeySchema),
	asyncHandler(APIKeyController.createAPIKey),
)

route.get('/', asyncHandler(APIKeyController.getListAPIKey))

route.delete('/:id', asyncHandler(APIKeyController.removeAPIKey))

module.exports = route
