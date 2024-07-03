const { StatusCodes, ReasonPhrases } = require('./httpStatusCode')

class SuccessReponse {
	constructor({
		message,
		statusCode = StatusCodes.OK,
		reasonStatusCode = ReasonPhrases.OK,
		metaData = {},
	}) {
		this.message = message ? message : reasonStatusCode
		this.statusCode = statusCode
		this.metaData = metaData
	}

	send(res, headers = {}) {
		return res.status(this.statusCode).json(this)
	}
}

class CreatedReponse extends SuccessReponse {
	constructor({ message, metaData }) {
		super({
			message,
			statusCode: StatusCodes.CREATED,
			reasonStatusCode: ReasonPhrases.CREATED,
			metaData,
		})
	}
}

class OKReponse extends SuccessReponse {
	constructor({ message, metaData }) {
		super({
			message,
			statusCode: StatusCodes.OK,
			reasonStatusCode: ReasonPhrases.OK,
			metaData,
		})
	}
}

class NoContentReponse extends SuccessReponse {
	constructor({ message = ReasonPhrases.NO_CONTENT, metaData }) {
		super({
			message,
			statusCode: StatusCodes.NO_CONTENT,
			reasonStatusCode: ReasonPhrases.NO_CONTENT,
			metaData,
		})
	}
}

module.exports = {
	CreatedReponse,
	OKReponse,
	NoContentReponse,
}
