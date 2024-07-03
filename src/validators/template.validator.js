const z = require('zod')

const templateSchema = z.object({
	body: z.object({
		name: z.string(),
	}),
})

const updateTemplateSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
	body: z.object({
		name: z.string(),
	}),
})

const deleteTemplateSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
})

module.exports = {
	templateSchema,
	updateTemplateSchema,
	deleteTemplateSchema,
}
