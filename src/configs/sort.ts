import type { Config, OverridesOptions } from '../types'

import perfectionist from 'eslint-plugin-perfectionist'

export const sort = (options: OverridesOptions = {}): Config[] => {
	const { overrides = {} } = options
	return [
		{
			name: 'nafsifan/perfectionist/rules',
			plugins: {
				perfectionist,
			},
			rules: {
				'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
				'perfectionist/sort-imports': ['error', {
					groups: [
						'type',
						['parent-type', 'sibling-type', 'index-type', 'internal-type'],

						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index'],
						'side-effect',
						'object',
						'unknown',
					],
					newlinesBetween: 'ignore',
					order: 'asc',
					type: 'natural',
				}],
				'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
				'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],

				...overrides,
			},
		},
	]
}
