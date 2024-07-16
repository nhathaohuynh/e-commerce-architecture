'use strict'

const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
} = require('@aws-sdk/client-s3')
const { aws } = require('./config-env')

const configS3 = {
	region: aws.region,
	credentials: {
		accessKeyId: aws.s3_accessKeyId,
		secretAccessKey: aws.s3_secretAccessKey,
	},
}

module.exports = {
	s3: new S3Client(configS3),
	PutObjectCommand,
	GetObjectCommand,
	DeleteObjectCommand,
}
