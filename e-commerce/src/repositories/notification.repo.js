'use strict'
const notificationModel = require('../models/notification.model')

class NotificationRepository {
	async createNotification(payload) {
		return await notificationModel.create(payload)
	}
}

module.exports = new NotificationRepository()
