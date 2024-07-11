const cloudinary = require('cloudinary').v2
const { cloudinary: cloudinary_env } = require('./config-env')

cloudinary.config({
	cloud_name: cloudinary_env.cloud_name,
	api_key: cloudinary_env.api_key,
	api_secret: cloudinary_env.api_secret,
})

module.exports = cloudinary
