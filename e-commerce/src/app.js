const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const { errorHandler } = require('./middleware/error-handler')
const { notFound } = require('./middleware/404-not-found')
const swaggerDocs = require('../docs/swagger')
const { writeLogStartRequest } = require('./middleware/write-log')

// const { checkOverload } = require('./helpers/check-connect')

const app = express()

// init  middleware

app.use(morgan('dev')) // log the request
app.use(helmet()) // secure the app by setting various HTTP headers
app.use(compression()) // reduce the size of the response and increase the speed of a web application
app.use(express.json()) // parse the body of the request
app.use(express.urlencoded({ extended: true })) // parse the body of the request
app.disable('x-powered-by') // disable the x-powered-by header

/// documentation api
swaggerDocs(app)

// init dbs

require('./databases')

// route

app.use(writeLogStartRequest)

app.use('/api/v1/e-commerce', require('./routes'))

// error 404

app.use(notFound)

// error handler

app.use(errorHandler)

module.exports = app
