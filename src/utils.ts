import { isPackageExists } from 'local-pkg'

export const getOptions = <T>(option: T) => {
	return (typeof option === 'object' && option ? option : {}) as T extends boolean ? object : NonNullable<T>
}

/**
 * Check if project uses TypeScript
 */
export function hasTypeScript(): boolean {
	return isPackageExists('typescript')
}

/**
 * Check if project uses React
 */
export function hasReact(): boolean {
	return isPackageExists('react')
}

/**
 * Check if project uses Vue
 */
export function hasVue(): boolean {
	return isPackageExists('vue')
}

/**
 * Check if project uses Next.js
 */
export function hasNextjs(): boolean {
	return isPackageExists('next')
}

/**
 * Check if project uses TailwindCSS
 */
export function hasTailwindcss(): boolean {
	return isPackageExists('tailwindcss')
}
