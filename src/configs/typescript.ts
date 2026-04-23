import type { Config, FilesOptions, OverridesOptions } from '../types'
import process from 'node:process'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import { GLOB_TS, GLOB_TSX } from '../globs'

export const typescript = (options: OverridesOptions & FilesOptions = {}): Config[] => {
	const { overrides = {}, files = [GLOB_TS, GLOB_TSX] } = options

	return [
		{
			name: 'nafsifan/typescript/rules',
			files,
			languageOptions: {
				parser: tsparser,
				parserOptions: {
					projectService: {
						allowDefaultProject: ['*.js', '*.mjs'],
					},
					tsconfigRootDir: process.cwd(),
				},
			},
			plugins: {
				'@typescript-eslint': tseslint,
			},
			rules: {
				...tseslint.configs['eslint-recommended'].overrides![0].rules,
				...tseslint.configs.strict.rules,

				'no-dupe-class-members': 'off',
				'no-redeclare': 'off',
				'no-use-before-define': 'off',
				'no-useless-constructor': 'off',
				'@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
				'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
				'@typescript-eslint/consistent-type-imports': ['error', {
					disallowTypeAnnotations: false,
					fixStyle: 'separate-type-imports',
					prefer: 'type-imports',
				}],

				'@typescript-eslint/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
				'@typescript-eslint/no-dupe-class-members': 'error',
				'@typescript-eslint/no-dynamic-delete': 'off',
				'@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-extraneous-class': 'off',
				'@typescript-eslint/no-import-type-side-effects': 'error',
				'@typescript-eslint/no-invalid-void-type': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
				'@typescript-eslint/no-require-imports': 'error',
				'@typescript-eslint/no-unused-expressions': ['error', {
					allowShortCircuit: true,
					allowTaggedTemplates: true,
					allowTernary: true,
				}],
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
				'@typescript-eslint/no-useless-constructor': 'off',
				'@typescript-eslint/no-wrapper-object-types': 'error',
				'@typescript-eslint/triple-slash-reference': 'off',
				'@typescript-eslint/unified-signatures': 'off',

				...overrides,
			},
		},
	]
}
