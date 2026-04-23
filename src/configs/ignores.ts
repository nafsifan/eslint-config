import type { Config } from '../types'
import { GLOB_EXCLUDE } from '../globs'

export const ignores = (userIgnores: string[] = []): Config[] => {
	return [
		{
			name: 'nafsifan/ignores',
			ignores: [...GLOB_EXCLUDE, ...userIgnores],
		},
	]
}
