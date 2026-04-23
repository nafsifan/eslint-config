import { writeFile } from 'node:fs/promises'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { comments, imports, javascript, jsdoc, jsonc, nextjs, react, sort, stylistic, tailwindcss, typescript, unicorn, vue } from '../src/configs'

async function generateTypes() {
	const configs = [
		...(await javascript()),
		...(await comments()),
		...(await unicorn()),
		...(await stylistic()),
		...(await jsdoc()),
		...(await jsonc()),
		...(await typescript()),
		...(await imports()),
		...(await sort()),
		...(await react()),
		...(await vue()),
		...(await nextjs()),
		...(await tailwindcss()),

		{
			name: 'eslint/builtin-rules',
			plugins: { '': { rules: Object.fromEntries(builtinRules) } },
		},
	]

	let dts = await flatConfigsToRulesDTS(configs, {
		includeAugmentation: false,
		exportTypeName: 'Rules',
	})

	const configNames = configs
		.map(config => config.name)
		.filter(Boolean) as string[]

	const configNamesType = configNames.length > 0
		? configNames.map(name => `'${name}'`).join(' | ')
		: 'never'

	dts += `\n\nexport type ConfigNames = ${configNamesType}\n`

	await writeFile('src/typegen.d.ts', dts)
}

await generateTypes()
