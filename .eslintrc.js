module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2020
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'rules': {
        'no-console': [
            'warn'
        ],
        'no-debugger': [
            'warn'
        ],
        'indent': [
            'warn',
            4,
            {
                'SwitchCase': 1,
                'FunctionDeclaration': {
                    'body': 1,
                    'parameters': 2
                }
            }
        ],
        'linebreak-style': [
            'warn',
            'unix'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'warn',
            'always'
        ],
        'max-len': [
            'warn',
            {
                'code': 100,
                'ignoreUrls': true
            }
        ],
        'no-trailing-spaces': [
            'warn'
        ],
        'eol-last': [
            'warn',
            'always'
        ],
        'no-multiple-empty-lines': [
            'warn'
        ],
        'brace-style': [
            'warn',
            '1tbs',
            {
                'allowSingleLine': true
            }
        ],
        'comma-dangle': [
            'warn',
            'never'
        ],
        'no-var': [
            'warn'
        ],
        'prefer-const': [
            'warn'
        ],
        'space-in-parens': [
            'warn'
        ],
        'no-use-before-define': [
            'warn'
        ]
    }
};
