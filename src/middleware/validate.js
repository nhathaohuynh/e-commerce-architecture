const validate = (schema) => async (req, res, next) => {
	try {
		await schema.parseAsync({
			body: req.body,
			query: req.query,
			params: req.params,
		})
		return next()
	} catch (err) {
		const error = new Error()
		error.message =
			err.errors[0].path[1] + ' ' + err.errors[0].message.toLowerCase()
		error.statusCode = 400
		next(error)
	}
}

module.exports = validate
