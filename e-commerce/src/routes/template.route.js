const { templateController } = require('../controllers')
const asyncHandler = require('../middleware/async-handler')
const {
	templateSchema,
	updateTemplateSchema,
	deleteTemplateSchema,
} = require('../validators/template.validator')
const { validate } = require('../middleware/validate')
const { checkPermission, checkAPIKey } = require('../middleware/check-api-key')
const { PERMISSIONS } = require('../constants')

const route = require('express').Router()

// route.use(checkAPIKey)
// route.use(checkPermission(PERMISSIONS[0]))

route.post(
	'/',
	validate(templateSchema),
	asyncHandler(templateController.createTemplate),
)

route.get('/', asyncHandler(templateController.getListTemplate))

route.delete(
	'/:id',
	validate(deleteTemplateSchema),
	asyncHandler(templateController.removeTemplate),
)

route.put(
	'/:id',
	validate(updateTemplateSchema),
	asyncHandler(templateController.updateTemplate),
)

module.exports = route
