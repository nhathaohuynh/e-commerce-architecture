require('dotenv').config()

const dev = {
	app: {
		port: process.env.DEV_APP_PORT,
	},

	db: {
		mongo_url: process.env.DEV_MONGO_URL,
		redis_url: process.env.DEV_REDIS_URL,
	},

	email: {
		host: process.env.DEV_SMTP_HOST,
		port: process.env.DEV_SMTP_PORT,
		service: process.env.DEV_SMTP_SERVICE,
		mail: process.env.DEV_SMTP_MAIL,
		password: process.env.DEV_SMTP_PASSWORD,
	},

	url: {
		base_url: process.env.DEV_BASE_URL,
	},

	cloudinary: {
		cloud_name: process.env.DEV_CLOUDINARY_CLOUD_NAME,
		api_key: process.env.DEV_CLOUDINARY_API_KEY,
		api_secret: process.env.DEV_CLOUDINARY_API_SECRET,
	},

	aws: {
		region: process.env.DEV_S3_AWS_REGION,
		s3_accessKeyId: process.env.DEV_S3_ACCESS_KEY,
		s3_secretAccessKey: process.env.DEV_S3_SECRET_KEY,
		s3_bucket_name: process.env.DEV_S3_BUCKET_NAME,
	},
}

const pro = {
	app: {
		port: process.env.PRO_APP_PORT,
	},

	db: {
		url: process.env.PRO_DB_MONGO_URL,
		redis_url: process.env.PRO_REDIS_URL,
	},

	email: {
		host: process.env.PRO_SMTP_HOST,
		port: process.env.PRO_SMTP_PORT,
		service: process.env.PRO_SMTP_SERVICE,
		mail: process.env.PRO_SMTP_MAIL,
		password: process.env.PRO_SMTP_PASSWORD,
	},

	url: {
		base_url: process.env.PRO_BASE_URL,
	},

	cloudinary: {
		cloud_name: process.env.PRO_CLOUDINARY_CLOUD_NAME,
		api_key: process.env.PRO_CLOUDINARY_API_KEY,
		api_secret: process.env.PRO_CLOUDINARY_API_SECRET,
	},
}

const config = { dev, pro }

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
