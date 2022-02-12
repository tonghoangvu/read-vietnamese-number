module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'ts'], // Must have 'js' first
	testRegex: ['.test.js$', '.test.ts$'],
	roots: ['<rootDir>/test'],
}
