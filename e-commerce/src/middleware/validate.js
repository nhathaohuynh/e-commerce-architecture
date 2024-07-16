const { PRODUCT_TYPE } = require('../constants')
const { BadRequest } = require('../cores/custom-http-response/response.error')
const {
	extendsUpdateClothesSchema,
	extendsUpdateLaptopSchema,
	extendsUpdateSmartphoneSchema,
	extendedClothesSchema,
	extendedLaptopSchema,
	extendedSmartphoneSchema,
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
			case PRODUCT_TYPE.SMARTPHONE:
				return validate(extendsUpdateSmartphoneSchema)(req, res, next)

			case PRODUCT_TYPE.LAPTOP:
				return validate(extendsUpdateLaptopSchema)(req, res, next)

			case PRODUCT_TYPE.CLOTHING:
				return validate(extendsUpdateClothesSchema)(req, res, next)

			default:
				throw next(new BadRequest('Invalid product type'))
		}
	} else {
		switch (typeProduct) {
			case PRODUCT_TYPE.SMARTPHONE:
				return validate(extendedSmartphoneSchema)(req, res, next)

			case PRODUCT_TYPE.LAPTOP:
				return validate(extendedLaptopSchema)(req, res, next)

			case PRODUCT_TYPE.CLOTHING:
				return validate(extendedClothesSchema)(req, res, next)

			default:
				throw next(new BadRequest('Invalid product type'))
		}
	}
}

module.exports = { validateProduct, validate }
