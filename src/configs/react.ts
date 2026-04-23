import type { Config, FilesOptions, ReactOptions } from '../types'
import a11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import { GLOB_REACT } from '../globs'

export const react = (options: ReactOptions & FilesOptions = {}): Config[] => {
	const { overrides = {}, a11y = true, files = [GLOB_REACT] } = options

	return [
		{
			name: 'nafsifan/react/rules',
			files,
			plugins: {
				'react': reactPlugin,
				'react-hooks': reactHooksPlugin,
				...(a11y ? { 'jsx-a11y': a11yPlugin } : {}),
			},
			languageOptions: {
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			settings: {
				react: {
					version: 'detect',
				},
			},
			rules: {
				// React Core Rules
				'react/display-name': 'error',
				'react/jsx-key': ['error', {
					checkFragmentShorthand: true,
					checkKeyMustBeforeSpread: true,
					warnOnDuplicates: true,
				}],
				'react/jsx-no-comment-textnodes': 'error',
				'react/jsx-no-duplicate-props': 'error',
				'react/jsx-no-target-blank': ['error', {
					enforceDynamicLinks: 'always',
					warnOnSpreadAttributes: true,
				}],
				'react/jsx-no-undef': 'error',
				'react/jsx-uses-react': 'error',
				'react/jsx-uses-vars': 'error',
				'react/no-children-prop': 'error',
				'react/no-danger-with-children': 'error',
				'react/no-deprecated': 'error',
				'react/no-direct-mutation-state': 'error',
				'react/no-find-dom-node': 'error',
				'react/no-is-mounted': 'error',
				'react/no-render-return-value': 'error',
				'react/no-string-refs': 'error',
				'react/no-unescaped-entities': 'error',
				'react/no-unknown-property': 'error',
				'react/no-unsafe': 'error',
				'react/prop-types': 'off',
				'react/react-in-jsx-scope': 'off',
				'react/require-render-return': 'error',

				'react/jsx-no-constructed-context-values': 'error',
				'react/jsx-no-script-url': 'error',
				'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
				'react/no-array-index-key': 'warn',
				'react/no-object-type-as-default-prop': 'error',
				'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
				'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
				'react/self-closing-comp': ['error', {
					component: true,
					html: true,
				}],
				'react/jsx-boolean-value': ['error', 'never', { always: [] }],
				'react/jsx-curly-brace-presence': ['error', {
					props: 'never',
					children: 'never',
					propElementValues: 'always',
				}],
				'react/jsx-fragments': ['error', 'syntax'],
				'react/jsx-pascal-case': ['error', {
					allowAllCaps: true,
					ignore: [],
				}],

				// React Hooks Rules
				'react-hooks/rules-of-hooks': 'error',
				'react-hooks/exhaustive-deps': 'warn',

				// JSX A11y
				...(a11y ? a11yPlugin.flatConfigs.recommended.rules : {}),

				...overrides,
			},
		},
	]
}
