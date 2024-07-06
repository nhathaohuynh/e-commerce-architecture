const { format, createLogger, transports } = require('winston')
require('winston-daily-rotate-file')

class Logger {
	constructor() {
		const formatPrint = format.printf(
			({ level, message, context, requestID, timestamp, metaData }) => {
				return `${timestamp} - ${requestID} - ${level} - ${message} - ${context} - ${
					metaData ? JSON.stringify(metaData) : ''
				}`
			},
		)

		this.logger = createLogger({
			format: format.combine(
				format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				formatPrint,
			),

			transports: [
				new transports.Console(),
				new transports.DailyRotateFile({
					level: 'info',
					dirname: 'src/logs',
					filename: 'application-%DATE%.info.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true, // create zip file
					maxSize: '20m', // rotate log after 20MB
					maxFiles: '1d', // delete log after 14 days
					format: format.combine(
						format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
						formatPrint,
					),
				}),

				new transports.DailyRotateFile({
					level: 'error',
					dirname: 'src/logs',
					filename: 'application-%DATE%.error.log',
					datePattern: 'YYYY-MM-DD',
					zippedArchive: true, // create zip file
					maxSize: '20m', // rotate log after 20MB
					maxFiles: '1d', // delete log after 5 days
					format: format.combine(
						format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
						formatPrint,
					),
				}),
			],
		})
	}

	comonParams(params) {
		if (!Array.isArray(params)) {
			const { context, requestID, metaData } = params

			return {
				requestID: requestID || 'unKnown',
				context,
				metaData,
			}
		} else {
			const [context, requestID, metaData] = params

			return {
				requestID: requestID || 'unKnown',
				context,
				metaData,
			}
		}
	}

	log(message, params) {
		const paramsLog = this.comonParams(params)
		const logObject = Object.assign(
			{
				message,
			},
			paramsLog,
		)
		this.logger.info(logObject)
	}

	error(message, params) {
		const paramsLog = this.comonParams(params)
		const logObject = Object.assign(
			{
				message,
			},
			paramsLog,
		)
		this.logger.error(logObject)
	}
}

module.exports = new Logger()
