module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		'no-console': 'warn',
		'no-debugger': 'warn',
		'no-multi-spaces': 'warn',
		'no-multiple-empty-lines': 'warn',
		'no-trailing-spaces': 'error',
		'indent': [
			'error', 'tab',
			{
				'SwitchCase': 1
			}
		],
		'semi': ['error', 'never'],
		'quotes': ['error', 'single'],
		'linebreak-style': ['error', 'unix'],
		'brace-style': ['error', '1tbs'],
		'eol-last': ['error', 'always'],
		'comma-dangle': ['warn', 'never'],
		'array-bracket-spacing': ['warn', 'never'],
		'object-curly-spacing': ['warn', 'always']
	}
}
