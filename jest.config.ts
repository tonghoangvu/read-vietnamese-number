import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	maxWorkers: '50%',
	collectCoverage: true,
	collectCoverageFrom: ['./src/**'],
	coveragePathIgnorePatterns: ['./src/index.ts'],
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
				// Set target to ES2020 to use bigint in tests
				tsconfig: 'tsconfig.jest.json',
			},
		],
	},
}

export default config
