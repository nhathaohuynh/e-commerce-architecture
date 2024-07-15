const {
	extendedClothesSchema,
	extendedLaptopSchema,
	extendedSmartphoneSchema,
} = require('../validators/product.validator') // Adjust the path as needed

describe('Combined Clothes Schema Validation', () => {
	test('should validate correct clothes data', () => {
		const validClothesData = {
			body: {
				name: 'T-shirt',
				thumbnail: 'thumbnail.jpg',
				images: 'image.jpg',
				description: 'A cool t-shirt',
				price: 19.99,
				quantity: 100,
				type: 'clothing',
				category: 'men',
				shopID: 'shop123',
				attributes: {
					brand: 'CoolBrand',
					color: ['red', 'blue'],
					size: 'M',
					material: 'cotton',
				},
			},
		}

		expect(() => extendedClothesSchema.parse(validClothesData)).not.toThrow()
	})

	test('should fail validation for incorrect clothes data', () => {
		const invalidClothesData = {
			body: {
				name: 'T-shirt',
				thumbnail: 'thumbnail.jpg',
				images: 'image.jpg',
				description: 'A cool t-shirt',
				price: 19.99,
				quantity: 100,
				type: 'clothing',
				category: 'men',
				shopID: 'shop123',
				attributes: {
					brand: 'CoolBrand',
					color: ['red', 'blue'],
					size: 'XXLL', // Invalid size
					material: 'cotton',
				},
			},
		}

		expect(() => extendedClothesSchema.parse(invalidClothesData)).toThrow()
	})
})

describe('Combined Laptop Schema Validation', () => {
	test('should validate correct laptop data', () => {
		const validLaptopData = {
			body: {
				name: 'Laptop X',
				thumbnail: 'thumbnail.jpg',
				images: 'image.jpg',
				description: 'A high-end laptop',
				price: 1999.99,
				quantity: 50,
				type: 'electronics',
				category: 'laptops',
				shopID: 'shop123',
				attributes: {
					brand: 'LaptopBrand',
					screen: '15 inch',
					hard_drive: '1TB',
					microprocessor: 'Intel i7',
					camera: 'HD',
					storage: '16GB',
					operate_system: 'Windows 10',
				},
			},
		}

		expect(() => extendedLaptopSchema.parse(validLaptopData)).not.toThrow()
	})

	test('should fail validation for incorrect laptop data', () => {
		const invalidLaptopData = {
			body: {
				name: 'Laptop X',
				thumbnail: 'thumbnail.jpg',
				images: 'image.jpg',
				description: 'A high-end laptop',
				price: 1999.99,
				quantity: 50,
				type: 'electronics',
				category: 'laptops',
				shopID: 'shop123',
				attributes: {
					brand: 'LaptopBrand',
					screen: '15 inch',
					hard_drive: '1TB',
					microprocessor: 'Intel i7',
					camera: 'HD',
					storage: '16GB',
					operate_system: 12345, // Invalid operate_system
				},
			},
		}

		expect(() => extendedLaptopSchema.parse(invalidLaptopData)).toThrow()
	})
})

describe('Combined Smartphone Schema Validation', () => {
	test('should validate correct smartphone data', () => {
		const validSmartphoneData = {
			body: {
				name: 'Smartphone Y',
				thumbnail: 'thumbnail.jpg',
				images: 'image.jpg',
				description: 'A high-end smartphone',
				price: 999.99,
				quantity: 200,
				type: 'electronics',
				category: 'smartphones',
				shopID: 'shop123',
				attributes: {
					brand: 'PhoneBrand',
					screen: '6 inch',
					RAM: '8GB',
					camera: '12MP',
					storage: '128GB',
					operate_system: 'Android',
				},
			},
		}

		expect(() =>
			extendedSmartphoneSchema.parse(validSmartphoneData),
		).not.toThrow()
	})

	test('should fail validation for incorrect smartphone data', () => {
		const invalidSmartphoneData = {
			body: {
				name: 'Smartphone Y',
				thumbnail: 'thumbnail.jpg',
				images: 'image.jpg',
				description: 'A high-end smartphone',
				price: 999.99,
				quantity: 200,
				type: 'electronics',
				category: 'smartphones',
				shopID: 'shop123',
				attributes: {
					brand: 'PhoneBrand',
					screen: '6 inch',
					RAM: '8GB',
					camera: '12MP',
					storage: '128GB',
					operate_system: 12345, // Invalid operate_system
				},
			},
		}

		expect(() =>
			extendedSmartphoneSchema.parse(invalidSmartphoneData),
		).toThrow()
	})
})
