const z = require('zod')

const APIKeySchema = z.object({
	body: z.object({
		permissions: z.array(z.string()).nonempty(),
	}),
})

module.exports = APIKeySchema
