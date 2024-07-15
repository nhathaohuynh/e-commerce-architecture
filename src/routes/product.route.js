'use strict'

const { productController } = require('../controllers')
const asyncHandler = require('../middleware/async-handler')
const { validateProduct, validate } = require('../middleware/validate')
const { checkPermission, checkAPIKey } = require('../middleware/check-api-key')
const { PERMISSIONS } = require('../constants')
const { deleteProductSchema } = require('../validators/product.validator')

const route = require('express').Router()

// route.use(checkAPIKey)
// route.use(checkPermission(PERMISSIONS[0]))

route.post('/', validateProduct, asyncHandler(productController.createProduct))

route.get('/', asyncHandler(productController.getListProduct))

route.delete(
	'/:id',
	validate(deleteProductSchema),
	asyncHandler(productController.removeProduct),
)

route.put(
	'/:id',
	validateProduct,
	asyncHandler(productController.updateProduct),
)

module.exports = route
