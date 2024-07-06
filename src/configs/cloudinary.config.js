const cloudinary = require('cloudinary').v2
const { cloudinary } = require('./config-env')

cloudinary.config({
	cloud_name: cloudinary.cloud_name,
	api_key: cloudinary.api_key,
	api_secret: cloudinary.api_secret,
})

module.exports = cloudinary
