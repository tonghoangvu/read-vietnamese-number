import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	maxWorkers: '50%',
	collectCoverage: true,
	collectCoverageFrom: ['./src/**'],
	coveragePathIgnorePatterns: ['/node_modules/', './src/index.ts', './src/demo.ts'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 90,
			statements: 90,
		},
	},

	// https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
				isolatedModules: true, // Test faster by skip type-checking
				// Set target to ES2020 to use bigint in tests
				tsconfig: 'tsconfig-jest.json',
			},
		],
	},
}

export default config
