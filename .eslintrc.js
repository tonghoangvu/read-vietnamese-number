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
        'no-trailing-spaces': 'error',
        'no-multiple-empty-lines': 'error',

        'indent': [
            'error', 4,
            {
                'SwitchCase': 1,
                'FunctionDeclaration': {
                    'body': 1,
                    'parameters': 2
                }
            }
        ],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'comma-dangle': ['error', 'never'],

        'max-len': [
            'warn',
            {
                'code': 100,
                'ignoreUrls': true
            }
        ],
        'brace-style': [
            'warn', '1tbs',
            {
                'allowSingleLine': true
            }
        ]
    }
}
