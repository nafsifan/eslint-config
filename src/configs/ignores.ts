import type { Config, IgnoreOptions } from '../types'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { GLOB_EXCLUDE } from '../globs'

const uniquePatterns = (patterns: string[]): string[] => {
	return [...new Set(patterns)]
}

const getGitignorePatterns = (gitignorePath: string): string[] => {
	if (!existsSync(gitignorePath)) {
		return []
	}

	try {
		const content = readFileSync(gitignorePath, 'utf8')

		return content
			.split(/\r?\n/u)
			.map(line => line.trim())
			.filter(line => line.length > 0 && !line.startsWith('#'))
	}
	catch {
		return []
	}
}

export const ignores = (options: IgnoreOptions = {}): Config[] => {
	const {
		patterns = [],
		useGitignore = true,
		gitignorePath = resolve(process.cwd(), '.gitignore'),
	} = options

	const gitignorePatterns = useGitignore
		? getGitignorePatterns(gitignorePath)
		: []

	return [
		{
			name: 'nafsifan/ignores',
			ignores: uniquePatterns([...GLOB_EXCLUDE, ...gitignorePatterns, ...patterns]),
		},
	]
}
