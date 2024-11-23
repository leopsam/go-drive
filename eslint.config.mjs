import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,cjs,ts,tsx}'],
        languageOptions: {
            parser: parser,
            globals: globals.node,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: pluginPrettier,
        },

        rules: {
            'no-console': 'warn',
            'no-unused-vars': 'off',
            'prefer-const': 'warn',
            eqeqeq: ['error', 'always'],

            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/consistent-type-imports': 'warn',
            '@typescript-eslint/no-var-requires': 'error',

            'prettier/prettier': [
                'error',
                {
                    semi: false,
                    singleQuote: true,
                    trailingComma: 'all',
                    printWidth: 160,
                    tabWidth: 4,
                    arrowParens: 'avoid',
                    bracketSpacing: true,
                },
            ],

            'arrow-body-style': ['warn', 'as-needed'],
            'no-multiple-empty-lines': ['warn', { max: 1 }],
            'object-curly-spacing': ['warn', 'always'],
            'array-bracket-spacing': ['warn', 'never'],
            'max-len': ['warn', { code: 160 }],
            'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
        },
    },
    pluginJs.configs.recommended,
    prettier,
]
