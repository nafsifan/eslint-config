import type { Config, IgnoreOptions } from '../types'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { includeIgnoreFile } from '@eslint/compat'
import { GLOB_EXCLUDE } from '../globs'

const uniquePatterns = (patterns: string[]): string[] => {
	return [...new Set(patterns)]
}

export const ignores = (options: IgnoreOptions = {}): Config[] => {
	const {
		patterns = [],
		useGitignore = true,
		gitignorePath = resolve(process.cwd(), '.gitignore'),
	} = options

	const gitignorePatterns = useGitignore && existsSync(gitignorePath)
		? (includeIgnoreFile(gitignorePath).ignores ?? [])
		: []

	return [
		{
			name: 'nafsifan/ignores',
			ignores: uniquePatterns([...GLOB_EXCLUDE, ...gitignorePatterns, ...patterns]),
		},
	]
}
