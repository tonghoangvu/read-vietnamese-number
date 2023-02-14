import type { Config } from 'jest'

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'\\.ts$': [
			'ts-jest',
			{
				tsconfig: {
					// To use bigint literals in tests
					target: 'ES2020',
				},
			},
		],
	},
}

export default config
