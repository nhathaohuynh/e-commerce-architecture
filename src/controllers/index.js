// Importing all the controllers

const APIKey = require('./APIKey.controller')

module.exports = {
	userController: require('./user.controller'),
	APIKeyController: require('./APIKey.controller'),
	templateController: require('./template.controller'),
	uploadController: require('./upload.controller'),
	productController: require('./product.controller'),
}
