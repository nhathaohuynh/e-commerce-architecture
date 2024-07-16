const { ReasonPhrases } = require('./httpStatusCode')
const statusCodes = require('./statusCodes')

class ErrorReponse extends Error {
	constructor(message, status) {
		super(message)
		this.status = status
		this.now = Date.now()
	}
}

class BadRequest extends ErrorReponse {
	constructor(
		message = ReasonPhrases.BAD_REQUEST,
		status = statusCodes.BAD_REQUEST,
	) {
		super(message, status)
	}
}

class ConflictError extends ErrorReponse {
	constructor(message = ReasonPhrases.CONFLICT, status = statusCodes.CONFLICT) {
		super(message, status)
	}
}

class InternalServerError extends ErrorReponse {
	constructor(
		message = ReasonPhrases.INTERNAL_SERVER_ERROR,
		status = statusCodes.INTERNAL_SERVER_ERROR,
	) {
		super(message, status)
	}
}

class ForbiddenError extends ErrorReponse {
	constructor(
		message = ReasonPhrases.FORBIDDEN,
		status = statusCodes.FORBIDDEN,
	) {
		super(message, status)
	}
}

class UnauthorizedError extends ErrorReponse {
	constructor(
		message = ReasonPhrases.UNAUTHORIZED,
		status = statusCodes.UNAUTHORIZED,
	) {
		super(message, status)
	}
}

class TooManyRequest extends ErrorReponse {
	constructor(
		message = ReasonPhrases.TOO_MANY_REQUESTS,
		status = statusCodes.TOO_MANY_REQUESTS,
	) {
		super(message, status)
	}
}

class NotFoundError extends ErrorReponse {
	constructor(
		message = ReasonPhrases.NOT_FOUND,
		status = statusCodes.NOT_FOUND,
	) {
		super(message, status)
	}
}

module.exports = {
	BadRequest,
	ConflictError,
	ForbiddenError,
	UnauthorizedError,
	TooManyRequest,
	NotFoundError,
	InternalServerError,
}
