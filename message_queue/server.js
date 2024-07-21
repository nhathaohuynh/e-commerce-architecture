'use strict'

// const consumer = require('./src/services/consumer.service')

// consumer.consumerToQueueFailed()

// consumer.consumerToQueueNormal()

const consumer = require('./src/services/ordered.consumer.service')

consumer.consumer().then(() => console.log('Consumer started'))
