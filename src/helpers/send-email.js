const nodemailer = require('nodemailer')
const { email } = require('../configs/config-env')
const Logger = require('../loggers')

const sendMail = async (options) => {
	const transporter = nodemailer.createTransport({
		host: email.host,
		port: email.port,
		service: email.service,
		auth: {
			user: email.mail,
			pass: email.password,
		},
	})

	const mailOptions = {
		from: email.mail,
		to: options.email,
		subject: options.subject,
		html: options.html,
	}

	const response = await transporter.sendMail(mailOptions)

	Logger.log(`Email sent: ${response.envelope}`, [])
}

module.exports = sendMail
