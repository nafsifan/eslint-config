import type { Config, FilesOptions, ReactOptions } from '../types'
import reactPlugin from '@eslint-react/eslint-plugin'
import a11yPlugin from 'eslint-plugin-jsx-a11y'
import { GLOB_REACT } from '../globs'

export const react = (options: ReactOptions & FilesOptions = {}): Config[] => {
	const { overrides = {}, a11y = true, files = [GLOB_REACT] } = options
	const rec = reactPlugin.configs['recommended-typescript']

	return [
		{
			name: 'nafsifan/react/rules',
			files,
			plugins: {
				...rec.plugins,
				...(a11y ? { 'jsx-a11y': a11yPlugin } : {}),
			},
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			settings: rec.settings,
			rules: {
				...rec.rules,
				'@eslint-react/no-array-index-key': 'warn',
				...(a11y ? a11yPlugin.flatConfigs.recommended.rules : {}),
				...overrides,
			},
		},
	]
}
