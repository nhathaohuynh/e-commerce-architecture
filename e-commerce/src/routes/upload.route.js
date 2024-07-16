const { uploadDisk, uploadMemory } = require('../configs/multer.config')
const { PERMISSIONS } = require('../constants')
const { uploadController } = require('../controllers')
const { checkAPIKey, checkPermission } = require('../middleware/check-api-key')
const asyncHandler = require('../middleware/async-handler')

const route = require('express').Router()

// route.use(checkAPIKey)
// route.use(checkPermission(PERMISSIONS[0]))

route.post(
	'/image',
	uploadDisk.single('file'),
	asyncHandler(uploadController.uploadImage),
)
route.post(
	'/aws-s3',
	uploadMemory.single('file'),
	asyncHandler(uploadController.uploadFilesAWSBucketS3),
)

module.exports = route
