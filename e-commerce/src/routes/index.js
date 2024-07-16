'use strict'

const express = require('express')

const route = express.Router()

route.get('/health-server', (req, res) => {
	res.status(200).json({ status: 'OK', message: 'Server is healthy' })
})

route.use('/user', require('./user.route'))
route.use('/APIKey', require('./APIKey.route'))
route.use('/template', require('./template.route'))
route.use('/upload', require('./upload.route'))
route.use('/product', require('./product.route'))

module.exports = route
