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

const userLoginSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string(),
	}),
})

module.exports = {
	userRegisterSchema,
	userVerifyEmailSchema,
	userLoginSchema,
}
