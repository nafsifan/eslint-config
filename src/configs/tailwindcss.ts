import type { Config, FilesOptions, TailwindOptions } from '../types'
import tailwind from 'eslint-plugin-better-tailwindcss'
import { GLOB_REACT, GLOB_VUE } from '../globs'

export const tailwindcss = (options: TailwindOptions & FilesOptions = {}): Config[] => {
	const { overrides = {}, settings = {}, files = [GLOB_REACT, GLOB_VUE] } = options

	return [
		{
			name: 'nafsifan/tailwindcss/rules',
			files,
			plugins: {
				'better-tailwindcss': tailwind,
			},
			settings: {
				'better-tailwindcss': {
					...settings,
				},
			},
			rules: {
				'better-tailwindcss/enforce-consistent-class-order': ['warn', { order: 'official' }],
				'better-tailwindcss/enforce-consistent-important-position': 'off',
				'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
				'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
				'better-tailwindcss/enforce-shorthand-classes': 'warn',
				'better-tailwindcss/no-conflicting-classes': 'error',
				'better-tailwindcss/no-deprecated-classes': 'error',
				'better-tailwindcss/no-duplicate-classes': 'error',
				'better-tailwindcss/no-restricted-classes': 'error',
				'better-tailwindcss/no-unnecessary-whitespace': 'warn',
				'better-tailwindcss/no-unregistered-classes': 'off',

				...overrides,
			},
		},
	]
}
