const { OKResponse } = require('../cores/custom-http-response/response.success')
const { uploadService } = require('../services')

class UploadController {
	async uploadImage(req, res) {
		return new OKResponse({
			message: 'Upload file success',
			metaData: await uploadService.uploadImage(req.file),
		}).send(res)
	}

	async uploadFilesAWSBucketS3(req, res) {
		return new OKResponse({
			message: 'Upload file  to s3 successfull',
			metaData: await uploadService.uploadFilesAWSBucketS3(req.file),
		}).send(res)
	}
}

module.exports = new UploadController()
