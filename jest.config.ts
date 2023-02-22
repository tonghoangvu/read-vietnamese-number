import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',

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
				tsconfig: 'tsconfig-jest.json',
			},
		],
	},
}

export default config
