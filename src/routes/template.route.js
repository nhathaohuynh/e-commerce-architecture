const { templateController } = require('../controllers')
const asyncHandler = require('../middleware/async-handler')
const templateSchema = require('../validators/template.validator')
const validate = require('../middleware/validate')
const { checkPermission, checkAPIKey } = require('../middleware/check-api-key')
const { PERMISSIONS } = require('../constants')

const route = require('express').Router()

route.use(checkAPIKey)
route.use(checkPermission(PERMISSIONS[0]))

route.post(
	'/create',
	validate(templateSchema),
	asyncHandler(templateController.createTemplate),
)

module.exports = route
