import type { Config, FilesOptions, OverridesOptions } from '../types'
import nextPlugin from '@next/eslint-plugin-next'
import { GLOB_REACT } from '../globs'

export const nextjs = (options: OverridesOptions & FilesOptions = {}): Config[] => {
	const { overrides = {}, files = [GLOB_REACT] } = options

	return [
		{
			name: 'nafsifan/nextjs/rules',
			files,
			plugins: {
				'@next/next': nextPlugin,
			},
			settings: {
				react: {
					version: 'detect',
				},
			},
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
				sourceType: 'module',
			},
			rules: {
				// Use official Next.js recommended configurations
				...nextPlugin.configs.recommended.rules as Record<string, any>,
				...nextPlugin.configs['core-web-vitals'].rules as Record<string, any>,

				...overrides,
			},
		},
	]
}
