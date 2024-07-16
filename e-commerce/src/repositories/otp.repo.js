const OTPModel = require('../models/otp.model')

class OTPRepository {
	async createOTP({ email, token }) {
		return await OTPModel.create({ otpEmail: email, otpToken: token })
	}

	async getOTPByToken({ token }) {
		return await OTPModel.findOne({ otpToken: token })
	}

	async deleteOTPByToken({ token }) {
		return await OTPModel.deleteOne({ otpToken: token })
	}
}

module.exports = new OTPRepository()
