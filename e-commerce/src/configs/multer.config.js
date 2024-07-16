const multer = require('multer')
const fs = require('fs')
const path = require('path')

const checkAndCreateUploadsFolder = (folderPath) => {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true })
	}
}

const uploadDisk = multer({
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			const uploadFolder = path.join(__dirname, '../uploads')
			checkAndCreateUploadsFolder(uploadFolder)
			cb(null, uploadFolder)
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`)
		},

		// check file
		fileFilter: (req, file, cb) => {
			if (
				file.mimetype === 'image/png' ||
				file.mimetype === 'image/jpg' ||
				file.mimetype === 'image/jpeg'
			) {
				cb(null, true)
			} else {
				cb(null, false)
			}
		},
		// checl size
		limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
	}),
})

const uploadMemory = multer({
	storage: multer.memoryStorage(),
})

module.exports = {
	uploadDisk,
	uploadMemory,
}
