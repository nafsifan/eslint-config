import type { Config, OverridesOptions } from '../types'
import eslintPluginImportX from 'eslint-plugin-import-x'

export const imports = (options: OverridesOptions = {}): Config[] => {
	const { overrides = {} } = options
	return [
		{
			name: 'nafsifan/imports/rules',
			plugins: {
				import: eslintPluginImportX,
			},
			rules: {
				'import/first': 'error',
				'import/no-default-export': 'off',
				'import/no-duplicates': 'error',
				'import/no-mutable-exports': 'error',
				'import/no-named-default': 'error',
				'import/no-self-import': 'error',
				'import/no-webpack-loader-syntax': 'error',
				'import/no-cycle': 'error',
				'import/no-useless-path-segments': 'error',
				'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

				...overrides,
			},
		},
	]
}
