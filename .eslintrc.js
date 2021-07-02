module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
        commonjs: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    rules: {
        'no-console': 'warn',
        'no-debugger': 'warn',
        'prefer-const': 'warn',
        'eqeqeq': 'warn',

        'key-spacing': 'error',
        'no-multi-spaces': 'error',
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': 'error',

        'quotes': ['error', 'single'],
        'brace-style': ['error', '1tbs'],
        'linebreak-style': ['error', 'unix'],

        'semi': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],

        'max-len': [
            'warn',
            {
                'code': 100,
                'ignoreUrls': true,
                'ignoreTrailingComments': true
            }
        ],
        'indent': [
            'error', 4,
            {
                'SwitchCase': 1,
                'FunctionDeclaration': {
                    'body': 1,
                    'parameters': 2
                }
            }
        ]
    }
}
