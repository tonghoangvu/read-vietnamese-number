module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'ts'], // Must have 'js' first
	testRegex: ['.test.js$', '.test.ts$'],
	roots: ['<rootDir>/test'],
	globals: {
		'ts-jest': {
			tsconfig: {
				// Must be ES2020 or later to use bigint literals in tests
				target: 'esnext',
			},
		},
	},
}
