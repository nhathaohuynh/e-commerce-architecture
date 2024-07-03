const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const fs = require('fs')

const yaml = fs.readFileSync(path.join(__dirname, '/api.yaml'), 'utf8')
const swaggerDocument = require('js-yaml').load(yaml)

const swaggerOptions = {
	swaggerDefinition: swaggerDocument,
	apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

function swaggerDocs(app) {
	// Swagger Page
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	// Documentation in JSON format
	app.get('/docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json')
		res.send(swaggerSpec)
	})
}
module.exports = swaggerDocs
