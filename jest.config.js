module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    testRegex: ['.test.js$', '.test.ts$'],
    roots: ['<rootDir>/__test__', '<rootDir>/test']
}
