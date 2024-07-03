const crypto = require('crypto')
const { generatorTokenRandom, replacePlaceholder } = require('../utils')
const { otpRepository, templateRepository } = require('../repositories')
const { BadRequest } = require('../cores/custom-http-response/response.error')
const { TEMPLATE_NAME } = require('../constants')
const { url } = require('../configs/config-env')
const sendMail = require('../helpers/send-email')

class EmailService {
	async sendEmailVerifyToken({ email }) {
		// 1. generate token
		const token = generatorTokenRandom()

		await otpRepository.createOTP({ email, token })

		// 2. get template
		const template = await templateRepository.getTemplateByName({
			name: TEMPLATE_NAME.HTML_EMAIL_SEND_TOKEN,
		})

		if (!template) throw next(new BadRequest('Template not found'))

		// 3. replace to placeholder with params

		const content = replacePlaceholder(template.html, {
			link_verify: `${url.base_url}/user/verify-email?token=${token}`,
		})

		// 4. send email

		await sendMail({
			email,
			subject: 'Pleasse verify email to complete registration account',
			html: content,
		})
	}

	async sendEmailTemporaryPassword({ password, email }) {
		console.log('password', password)
		console.log('email', email)
		const template = await templateRepository.getTemplateByName({
			name: TEMPLATE_NAME.HTML_EMAIL_SEND_TEMPORARY_PASSWORD,
		})

		if (!template) throw new BadRequest('Template not found')

		const content = replacePlaceholder(template.html, {
			temporary_password: password,
		})

		// 4. send email

		await sendMail({
			email,
			subject: 'Temporary Password',
			html: content,
		})
	}

	async checkEmailOTPToken({ token }) {
		const foundToken = await otpRepository.getOTPByToken({ token })

		if (!foundToken) throw new BadRequest('Token not found')

		otpRepository.deleteOTPByToken({ token }).then()

		return foundToken
	}
}

module.exports = new EmailService()
