const z = require('zod')

const userRegisterSchema = z.object({
	body: z.object({
		email: z.string().email(),
	}),
})

const userVerifyEmailSchema = z.object({
	query: z.object({
		token: z.string(),
	}),
})

module.exports = {
	userRegisterSchema,
	userVerifyEmailSchema,
}
