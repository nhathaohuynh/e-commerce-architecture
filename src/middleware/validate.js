const { BadRequest } = require('../cores/custom-http-response/response.error')
const {
	extendsUpdateClothesSchema,
	extendsUpdateLaptopSchema,
	extendsUpdateSmartphoneSchema,
} = require('../validators/product.validator')

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

const validateProduct = async (req, res, next) => {
	const typeProduct = req.body.type
	const { id } = req.params

	if (id) {
		switch (typeProduct) {
			case 'smartphone':
				return validate(extendsUpdateSmartphoneSchema)(req, res, next)

			case 'laptop':
				return validate(extendsUpdateLaptopSchema)(req, res, next)

			case 'clothes':
				return validate(extendsUpdateClothesSchema)(req, res, next)

			default:
				throw next(new BadRequest('Invalid product type'))
		}
	} else {
		switch (typeProduct) {
			case 'smartphone':
				return validate(smartphoneSchema)(req, res, next)

			case 'laptop':
				return validate(laptopSchema)(req, res, next)

			case 'clothes':
				return validate(clothesSchema)(req, res, next)

			default:
				throw next(new BadRequest('Invalid product type'))
		}
	}
}

module.exports = { validateProduct, validate }
