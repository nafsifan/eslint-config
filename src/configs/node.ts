import type { Config, OverridesOptions } from '../types'

import nodePlugin from 'eslint-plugin-n'

export const node = (options: OverridesOptions = {}): Config[] => {
	const { overrides = {} } = options

	return [
		{
			name: 'nafsifan/node/rules',
			plugins: {
				node: nodePlugin,
			},
			rules: {
				'node/handle-callback-err': ['error', '^(err|error)$'],
				'node/no-deprecated-api': 'error',
				'node/no-exports-assign': 'error',
				'node/no-new-require': 'error',
				'node/no-path-concat': 'error',
				'node/prefer-global/buffer': ['error', 'never'],
				'node/prefer-global/process': ['error', 'never'],
				'node/process-exit-as-throw': 'error',
				'node/no-missing-import': 'off',
				'node/no-unpublished-import': 'off',
				'node/no-unsupported-features/es-builtins': 'error',
				'node/no-unsupported-features/es-syntax': 'error',
				'node/no-unsupported-features/node-builtins': 'error',

				...overrides,
			},
		},
	]
}
