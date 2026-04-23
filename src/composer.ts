import type { Config, EnableOptions, ExtendedConfigNames } from './types'
import { FlatConfigComposer } from 'eslint-flat-config-utils'
import { comments, ignores, imports, javascript, jsdoc, jsonc, sort, stylistic, unicorn } from './configs'
import { hasNextjs, hasReact, hasTailwindcss, hasTypeScript, hasVue } from './utils'

export const nafsifan = async (
	options: EnableOptions = {},
): Promise<FlatConfigComposer<Config, ExtendedConfigNames>> => {
	const {
		javascript: enableJavascript = true,
		comments: enableComments = true,
		unicorn: enableUnicorn = true,
		stylistic: enableStylistic = true,
		jsdoc: enableJsdoc = true,
		jsonc: enableJsonc = true,
		imports: enableImports = true,
		sort: enableSort = true,
		ignores: enableIgnores = true,
		typescript: enableTypescript = hasTypeScript() && options?.typescript !== false,
		react: enableReact = hasReact() && options?.react !== false,
		vue: enableVue = hasVue() && options?.vue !== false,
		nextjs: enableNextjs = hasNextjs() && options?.nextjs !== false,
		tailwindcss: enableTailwindcss = hasTailwindcss() && options?.tailwindcss !== false,

		customConfigs = [],

		overrides = {},
	} = options

	let composer = new FlatConfigComposer<Config, string>()

	if (enableJavascript) {
		composer = composer.append(
			...javascript(typeof enableJavascript === 'object' ? enableJavascript : {}),
		)
	}

	if (enableComments) {
		composer = composer.append(
			...comments(typeof enableComments === 'object' ? enableComments : {}),
		)
	}

	if (enableUnicorn) {
		composer = composer.append(
			...unicorn(typeof enableUnicorn === 'object' ? enableUnicorn : {}),
		)
	}

	if (enableStylistic) {
		composer = composer.append(
			...stylistic(typeof enableStylistic === 'object' ? enableStylistic : {}),
		)
	}

	if (enableJsdoc) {
		composer = composer.append(
			...jsdoc(typeof enableJsdoc === 'object' ? enableJsdoc : {}),
		)
	}

	if (enableJsonc) {
		composer = composer.append(
			...jsonc(typeof enableJsonc === 'object' ? enableJsonc : {}),
		)
	}

	if (enableImports) {
		composer = composer.append(
			...imports(typeof enableImports === 'object' ? enableImports : {}),
		)
	}

	if (enableSort) {
		composer = composer.append(
			...sort(typeof enableSort === 'object' ? enableSort : {}),
		)
	}

	if (enableIgnores) {
		composer = composer.append(
			...ignores(Array.isArray(enableIgnores) ? enableIgnores : []),
		)
	}

	if (enableTypescript) {
		const { typescript } = await import('./configs/typescript')
		composer = composer.append(
			...typescript(typeof enableTypescript === 'object' ? enableTypescript : {}),
		)
	}

	if (enableReact) {
		const { react } = await import('./configs/react')
		composer = composer.append(
			...react(typeof enableReact === 'object' ? enableReact : {}),
		)
	}

	if (enableVue) {
		const { vue } = await import('./configs/vue')
		composer = composer.append(
			...vue(typeof enableVue === 'object' ? enableVue : {}),
		)
	}

	if (enableNextjs) {
		const { nextjs } = await import('./configs/nextjs')
		composer = composer.append(
			...nextjs(typeof enableNextjs === 'object' ? enableNextjs : {}),
		)
	}

	if (enableTailwindcss) {
		const { tailwindcss } = await import('./configs/tailwindcss')
		composer = composer.append(
			...tailwindcss(typeof enableTailwindcss === 'object' ? enableTailwindcss : {}),
		)
	}

	if (customConfigs.length > 0) {
		const customConfigItems = customConfigs.map(customConfig => ({
			name: `nafsifan/customConfig/${customConfig.name}`,
			...(customConfig.files && { files: customConfig.files }),
			...(customConfig.ignores && { ignores: customConfig.ignores }),
			...(customConfig.plugins && { plugins: customConfig.plugins }),
			...(customConfig.settings && { settings: customConfig.settings }),
			...(customConfig.rules && { rules: customConfig.rules }),
		}))

		composer = composer.append(...customConfigItems)
	}

	if (Object.keys(overrides).length > 0) {
		composer = composer.append({
			name: 'nafsifan/overrides',
			rules: overrides,
		})
	}

	return composer
}
