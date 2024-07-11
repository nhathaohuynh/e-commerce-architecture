'use strict'
const fs = require('fs')
const cloudinary = require('../configs/cloudinary.config')
const {
	InternalServerError,
} = require('../cores/custom-http-response/response.error')

const {
	s3,
	PutObjectCommand,
	GetObjectCommand,
} = require('../configs/s3-aws.config')
const { aws } = require('../configs/config-env')
// const { Upload } = require('@aws-sdk/lib-storage')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

class UploadService {
	async uploadImage(file, userID = '12312') {
		if (!file) throw new Error('No file uploaded or file size exceeds limit.')

		const filePath = file.path
		const public_id = `${userID}_${Date.now()}`
		const folder = `Product/${userID}`

		console.log('filePath', filePath)

		try {
			const result = await cloudinary.uploader.upload(filePath, {
				public_id,
				folder,
			})

			// Xóa file local sau khi upload lên Cloudinary
			fs.unlinkSync(filePath)

			return {
				data: {
					image_url: result.secure_url,
					public_id: result.public_id,
					thumb_url: cloudinary.url(result.public_id, {
						height: 100,
						width: 100,
						format: 'jpg',
					}),
				},
			}
		} catch (error) {
			throw new InternalServerError('Error uploading to Cloudinary')
		}
	}

	async uploadFilesAWSBucketS3(file, userID = '12312') {
		if (!file) throw new Error('No file uploaded or file size exceeds limit.')

		const keyName = `${userID}_${Date.now()}_${file.originalname}`

		try {
			const command = new PutObjectCommand({
				Bucket: aws.s3_bucket_name,
				Key: keyName,
				Body: file.buffer,
				// ContentType: 'image/jpeg',
			})

			await s3.send(command)

			const signedUrl = new GetObjectCommand({
				Bucket: aws.s3_bucket_name,
				Key: keyName,
			})

			const url = await getSignedUrl(s3, signedUrl, { expiresIn: 3600 })

			console.log('url', url)
			// const parallelUploads3 = new Upload({
			// 	client: s3
			// 	params: uploadParams,
			// })

			// parallelUploads3.on('httpUploadProgress', (progress) => {
			// 	console.log(progress)
			// })

			// await parallelUploads3.done()

			return {
				data: {
					url: url,
				},
			}
		} catch (error) {
			console.log(error)
			throw new InternalServerError('Error uploading to aws s3')
		}
	}
}

module.exports = new UploadService()
