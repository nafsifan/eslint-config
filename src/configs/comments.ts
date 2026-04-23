import type { Config, OverridesOptions } from '../types'
import commentsPlugin from '@eslint-community/eslint-plugin-eslint-comments'

export const comments = (options: OverridesOptions = {}): Config[] => {
	const { overrides } = options

	return [
		{
			name: 'nafsifan/eslint-comments/rules',
			plugins: {
				'eslint-comments': commentsPlugin,
			},
			rules: {
				'eslint-comments/no-aggregating-enable': 'error',
				'eslint-comments/no-duplicate-disable': 'error',
				'eslint-comments/no-unlimited-disable': 'error',
				'eslint-comments/no-unused-enable': 'error',

				...overrides,
			},
		},
	]
}
