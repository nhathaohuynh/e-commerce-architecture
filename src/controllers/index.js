// Importing all the controllers

const APIKey = require('./APIKey.controller')

module.exports = {
	userController: require('./access.controller'),
	APIKeyController: require('./APIKey.controller'),
	templateController: require('./template.controller'),
}
