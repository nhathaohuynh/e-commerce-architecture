const { z } = require('zod')

const baseProductSchema = z.object({
	brand: z.string(),
	model: z.string(),
	price: z.number(),
	stock: z.number(),
})

const clothesSchema = baseProductSchema.extend({
	color: z.array(z.string()),
	size: z.string(),
	material: z.string(),
})

const smartphoneSchema = baseProductSchema.extend({
	color: z.array(z.string()),
	ram: z.number(),
	storage: z.number(),
})

const laptopSchema = baseProductSchema.extend({
	color: z.array(z.string()),
	ram: z.number(),
	storage: z.number(),
	processor: z.string(),
})
