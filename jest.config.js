module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'ts'], // Must have js
	testRegex: ['.test.js$', '.test.ts$'],
	roots: ['<rootDir>/test'],
}
