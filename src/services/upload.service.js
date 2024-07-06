'use strict'

class UploadService {
	constructor() {
		this.cloudinary = require('../configs/cloudinary.config')
	}

	async uploadImageFromFile(file) {
		try {
			const folderName = 'product/shopID'
			const fileName = 'productID'

			const result = this.cloudinary.uploader.upload(file, {
				folder: folderName,
				public_id: fileName,
			})

			console.log(result)
		} catch (err) {
			throw new BadRequestError('Upload image failed')
		}
	}

	async uploadImageFromURL(
		url = 'https://i.ytimg.com/vi/dFIhLYlNXtw/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD8VgOYUadwIhNRxzZ-nvoD1dxnwg',
	) {
		try {
			const folderName = 'product/shopID'
			const fileName = 'productID'

			const result = this.cloudinary.uploader.upload(url, {
				folder: folderName,
				public_id: fileName,
			})

			console.log(result)
		} catch (err) {
			throw new BadRequestError('Upload image failed')
		}
	}
}

module.exports = new UploadService()
