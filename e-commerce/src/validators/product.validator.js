const { z } = require('zod')
const { SIZE } = require('../constants')

const baseProductSchema = z.object({
	body: z.object({
		name: z.string(),
		thumbnail: z.string(),
		images: z.array(z.string()),
		description: z.string(),
		price: z.number(),
		quantity: z.number(),
		type: z.string(),
		// category: z.string(),
		// shopID: z.string(),
		attributes: z.record(z.any()), // Allows any object
	}),
})

const clothesSchema = z.object({
	brand: z.string(),
	color: z.array(z.string()),
	size: z.enum(SIZE),
	material: z.string(),
})

const laptopSchema = z.object({
	brand: z.string(),
	screen: z.string(),
	hard_drive: z.string(),
	microprocessor: z.string(),
	camera: z.string(),
	storage: z.string(),
	operate_system: z.string(),
})

const smartphoneSchema = z.object({
	brand: z.string(),
	screen: z.string(),
	RAM: z.string(),
	camera: z.string(),
	storage: z.string(),
	operate_system: z.string(),
})

const deleteProductSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
})

const updateBaseProductSchema = z.object({
	body: z.object({
		name: z.string().optional(),
		thumbnail: z.string().optional(),
		images: z.array(z.string()).optional(),
		description: z.string().optional(),
		price: z.number().optional(),
		quantity: z.number().optional(),
		type: z.string().optional(),
		category: z.string().optional(),
		shopID: z.string().optional(),
		attributes: z.record(z.any()).optional(), // Allows any object
	}),
})

const updateClothesSchema = z.object({
	body: z.object({
		brand: z.string().optional(),
		color: z.array(z.string()).optional(),
		size: z.enum(SIZE).optional(),
		material: z.string().optional(),
	}),
})

const updateLaptopSchema = z.object({
	body: z.object({
		brand: z.string().optional(),
		screen: z.string().optional(),
		hard_drive: z.string().optional(),
		microprocessor: z.string().optional(),
		camera: z.string().optional(),
		storage: z.string().optional(),
		operate_system: z.string().optional(),
	}),
})

const updateSmartphoneSchema = z.object({
	body: z.object({
		brand: z.string().optional(),
		screen: z.string().optional(),
		RAM: z.string().optional(),
		camera: z.string().optional(),
		storage: z.string().optional(),
		operate_system: z.string().optional(),
	}),
})

module.exports = {
	extendedClothesSchema: z.object({
		body: baseProductSchema.shape.body.extend({
			attributes: clothesSchema,
		}),
	}),
	extendedLaptopSchema: z.object({
		body: baseProductSchema.shape.body.extend({
			attributes: laptopSchema,
		}),
	}),
	extendedSmartphoneSchema: z.object({
		body: baseProductSchema.shape.body.extend({
			attributes: smartphoneSchema,
		}),
	}),

	extendsUpdateClothesSchema: z.object({
		body: updateBaseProductSchema.shape.body.extend({
			attributes: updateClothesSchema.optional(),
		}),
		params: z.object({
			id: z.string(),
		}),
	}),
	extendsUpdateLaptopSchema: z.object({
		body: updateBaseProductSchema.shape.body.extend({
			attributes: updateLaptopSchema.optional(),
		}),
		params: z.object({
			id: z.string(),
		}),
	}),
	extendsUpdateSmartphoneSchema: z.object({
		body: updateBaseProductSchema.shape.body.extend({
			attributes: updateSmartphoneSchema.optional(),
		}),
		params: z.object({
			id: z.string(),
		}),
	}),

	deleteProductSchema,
}
