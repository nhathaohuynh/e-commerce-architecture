require('dotenv').config()

const dev = {
	app: {
		port: process.env.DEV_APP_PORT,
	},

	db: {
		url: process.env.DEV_DB_MONGO_URL,
	},

	email: {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		service: process.env.SMTP_SERVICE,
		mail: process.env.SMTP_MAIL,
		password: process.env.SMTP_PASSWORD,
	},

	url: {
		base_url: process.env.BASE_URL,
	},
}

const pro = {
	app: {
		port: process.env.PRO_APP_PORT,
	},

	db: {
		url: process.env.PRO_DB_MONGO_URL,
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
}

const config = { dev, pro }

const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]
