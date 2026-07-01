import type { Config, FilesOptions, TailwindOptions } from '../types'
import { isAbsolute, resolve } from 'node:path'
import process from 'node:process'
import tailwind from 'eslint-plugin-better-tailwindcss'
import { GLOB_REACT, GLOB_VUE } from '../globs'

export const tailwindcss = (options: TailwindOptions & FilesOptions = {}): Config[] => {
	const { overrides = {}, settings = {}, files = [GLOB_REACT, GLOB_VUE] } = options

	const resolvedSettings = { ...settings }
	if (resolvedSettings.entryPoint && !isAbsolute(resolvedSettings.entryPoint)) {
		resolvedSettings.entryPoint = resolve(process.cwd(), resolvedSettings.entryPoint)
	}

	return [
		{
			name: 'nafsifan/tailwindcss/rules',
			files,
			plugins: {
				'better-tailwindcss': tailwind,
			},
			settings: {
				'better-tailwindcss': resolvedSettings,
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
