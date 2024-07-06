'use strict'

const express = require('express')

const route = express.Router()

route.use('/user', require('./user.route'))
route.use('/APIKey', require('./APIKey.route'))
route.use('/template', require('./template.route'))
route.use('/upload', require('./upload.route'))

module.exports = route
