import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import type { ConfigNames, Rules } from './typegen'

export type ExtendedConfigNames = ConfigNames | string

/**
 * Enhanced ESLint configuration type with improved type safety and autocompletion.
 *
 * Extends ESLint's `Linter.Config` with:
 * - Relaxed type constraints for `plugins` and `rules` to accommodate plugins without proper type definitions
 * - Full autocompletion support for all available rules via auto-generated `Rules` type
 * - Better TypeScript integration for flat config format
 */
export type Config = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins' | 'rules'> & {
	/**
	 * Plugin name to plugin object mapping.
	 *
	 * Uses `Record<string, any>` to support plugins that lack complete TypeScript definitions.
	 * When `files` is specified, these plugins are only available to matching files.
	 *
	 * @see [ESLint Plugin Configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
	 */
	plugins?: Record<string, any>

	/**
	 * ESLint rules configuration with full type safety and autocompletion.
	 *
	 * Combines ESLint's standard rule format with auto-generated rule definitions
	 * to provide intelligent code completion for all available rules.
	 *
	 * @example
	 * ```ts
	 * rules: {
	 *   'no-console': 'error',
	 *   '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	 *   'import/order': 'off'
	 * }
	 * ```
	 */
	rules?: Record<string, Linter.RuleEntry<any> | undefined> & Rules
}

/**
 * Base interface for configuration options that support rule overrides.
 *
 * Used as a building block for other configuration types to provide
 * consistent rule override capabilities.
 */
export interface OverridesOptions {
	/**
	 * Custom rule overrides to apply on top of the base configuration.
	 *
	 * @example
	 * ```ts
	 * overrides: {
	 *   'no-console': 'off',
	 *   '@typescript-eslint/no-explicit-any': 'warn'
	 * }
	 * ```
	 */
	overrides?: Config['rules']
}

/**
 * Base interface for configuration options that support custom file patterns.
 *
 * Used as a building block for other configuration types to provide
 * consistent file pattern override capabilities.
 */
export interface FilesOptions {
	/**
	 * File patterns to apply rules to.
	 *
	 * When specified, overrides the default file patterns for this configuration.
	 *
	 * @example ['src/**\/*.ts', 'app/**\/*.tsx']
	 */
	files?: string[]
}

/**
 * Configuration options for React linting.
 *
 * Extends base override functionality with React-specific settings.
 */
export interface ReactOptions extends OverridesOptions {
	/**
	 * Enable accessibility (a11y) rules via eslint-plugin-jsx-a11y.
	 *
	 * @default true
	 */
	a11y?: boolean
}

/**
 * Configuration options for Vue.js linting.
 *
 * Extends base override functionality with Vue-specific settings.
 */
export interface VueOptions extends OverridesOptions {
	/**
	 * Enable accessibility (a11y) rules via eslint-plugin-vuejs-accessibility.
	 *
	 * @default true
	 */
	a11y?: boolean
}

/**
 * Configuration options for Tailwind CSS linting with better-tailwindcss plugin.
 *
 * Extends base override functionality with Tailwind-specific settings.
 */
export interface TailwindOptions extends OverridesOptions {
	/**
	 * Tailwind CSS plugin configuration settings.
	 *
	 * @see {@link TailwindSettings} for detailed configuration options
	 */
	settings?: TailwindSettings
}

/**
 * Configuration settings for the better-tailwindcss ESLint plugin.
 *
 * Supports both Tailwind CSS v3 (config file based) and v4 (CSS file based) setups.
 */
export interface TailwindSettings {
	/**
	 * Path to the Tailwind CSS entry file (Tailwind v4).
	 *
	 * For CSS-based Tailwind configurations, specify the main CSS file
	 * that contains your Tailwind directives.
	 *
	 * @example 'src/global.css'
	 */
	entryPoint?: string

	/**
	 * Path to the Tailwind configuration file (Tailwind v3).
	 *
	 * For JavaScript/TypeScript-based Tailwind configurations,
	 * specify the config file location.
	 *
	 * @example 'tailwind.config.js' | 'tailwind.config.ts'
	 */
	tailwindConfig?: string

	/**
	 * HTML attributes to check for Tailwind classes.
	 *
	 * @default ['class', 'className'] (auto-detected based on framework)
	 */
	attributes?: string[]

	/**
	 * Function/method names that accept Tailwind class strings.
	 *
	 * @example ['clsx', 'cn', 'classNames']
	 */
	callees?: string[]

	/**
	 * Variable names that contain Tailwind class strings.
	 *
	 * @example ['styles', 'classes']
	 */
	variables?: string[]

	/**
	 * Template literal tag functions for Tailwind classes.
	 *
	 * @example ['tw', 'tailwind']
	 */
	tags?: string[]
}

/**
 * Default stylistic formatting options.
 *
 * Picks essential formatting preferences from @stylistic/eslint-plugin
 * to maintain consistency across the codebase.
 */
export interface StylisticDefaults extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {}

/**
 * User-defined custom configuration block.
 *
 * Extends the base `Config` type with a required name for identification.
 * Allows users to define reusable, named configuration blocks that can be
 * applied to specific file patterns or used across multiple projects.
 */
export interface CustomConfig extends Omit<Config, 'name'> {
	/**
	 * Unique identifier for this configuration block.
	 *
	 * Used for debugging, logging, and configuration organization.
	 * Should be descriptive of the configuration's purpose.
	 *
	 * @example 'test-overrides' | 'legacy-code-rules' | 'strict-typescript'
	 */
	name: string
}

/**
 * Main configuration options for the ESLint configuration preset.
 *
 * Controls which rule sets to enable and how to configure them.
 * Most options support both boolean toggle and detailed configuration.
 */
export interface EnableOptions {
	// === Core Configurations (Enabled by Default) ===

	/**
	 * JavaScript base rules and global variables.
	 *
	 * @default true
	 */
	javascript?: boolean | OverridesOptions

	/**
	 * Comment formatting and documentation rules.
	 *
	 * @default true
	 */
	comments?: boolean | OverridesOptions

	/**
	 * Unicorn plugin rules for better JavaScript practices.
	 *
	 * @default true
	 */
	unicorn?: boolean | OverridesOptions
	/**
	 * Stylistic formatting rules using @stylistic/eslint-plugin.
	 *
	 * @default true
	 */
	stylistic?: boolean | OverridesOptions

	/**
	 * Code sorting rules using eslint-plugin-jsdoc.
	 *
	 * @default true
	 */
	jsdoc?: boolean | OverridesOptions

	/**
	 * Code sorting rules using eslint-plugin-jsonc.
	 *
	 * @default true
	 */
	jsonc?: boolean | (OverridesOptions & FilesOptions)

	/**
	 * Import/export statement rules and sorting.
	 *
	 * @default true
	 */
	imports?: boolean | OverridesOptions

	/**
	 * Code sorting rules using eslint-plugin-perfectionist.
	 *
	 * @default true
	 */
	sort?: boolean | OverridesOptions

	/**
	 * File patterns to ignore during linting.
	 *
	 * @default true (uses predefined ignore patterns)
	 * @example ['dist/**', 'node_modules/**', '*.config.js']
	 */
	ignores?: boolean | string[]

	// === Framework-Specific Configurations (Auto-detected or Explicit) ===

	/**
	 * TypeScript rules and type checking.
	 *
	 * @default false (auto-detected if tsconfig.json exists)
	 */
	typescript?: boolean | (OverridesOptions & FilesOptions)

	/**
	 * React component and JSX rules.
	 *
	 * @default false (auto-detected if React is found in dependencies)
	 */
	react?: boolean | (ReactOptions & FilesOptions)

	/**
	 * Vue.js component and template rules.
	 *
	 * @default false (auto-detected if Vue is found in dependencies)
	 */
	vue?: boolean | (VueOptions & FilesOptions)

	/**
	 * Next.js specific rules and optimizations.
	 *
	 * @default false (auto-detected if Next.js is found in dependencies)
	 */
	nextjs?: boolean | (OverridesOptions & FilesOptions)

	/**
	 * Tailwind CSS class validation and sorting.
	 *
	 * @default false (auto-detected if Tailwind is found in dependencies)
	 */
	tailwindcss?: boolean | (TailwindOptions & FilesOptions)

	// === Advanced Configuration ===

	/**
	 * User-defined configuration blocks for custom rules.
	 *
	 * Allows adding project-specific configurations that can target
	 * specific file patterns or provide specialized rule sets.
	 *
	 * @example
	 * ```ts
	 * customConfigs: [
	 *   {
	 *     name: 'test-files',
	 *     files: ['**\/\*.test.ts'],
	 *     rules: { '@typescript-eslint/no-explicit-any': 'off' }
	 *   }
	 * ]
	 * ```
	 */
	customConfigs?: CustomConfig[]

	/**
	 * Global rule overrides applied to all configurations.
	 *
	 * These overrides have the highest priority and will override
	 * any conflicting rules from other configuration sources.
	 *
	 * @example
	 * ```ts
	 * overrides: {
	 *   'no-console': 'off',
	 *   '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
	 * }
	 * ```
	 */
	overrides?: Config['rules']
}
