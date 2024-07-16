'use strict'

class Notification {
	constructor() {
		this.notificationRepo = require('../repositories/notification.repo')
	}

	async pushNotifcation({
		type = 'SHOP-001',
		senderID = 2313131,
		receiveID = 131313131,
		options = {},
	}) {
		let noti_content

		if (type === 'SHOP-001') {
			noti_content = '@@@ has just created a new product from @@@@'
		} else {
			noti_content = 'You have a new notification'
		}

		const newNotification = await this.notificationRepo.createNotification({
			type,
			senderID,
			receiveID,
			content: noti_content,
			options,
		})

		return newNotification
	}
}

module.exports = new Notification()
