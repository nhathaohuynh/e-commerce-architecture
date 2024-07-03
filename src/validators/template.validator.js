const z = require('zod')

const templateSchema = z.object({
	body: z.object({
		name: z.string(),
	}),
})

module.exports = templateSchema
