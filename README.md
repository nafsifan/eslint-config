# @nafsifan/eslint-config

[![NPM Version](https://img.shields.io/npm/v/%40nafsifan%2Feslint-config)](https://www.npmjs.com/package/@nafsifan/eslint-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

基于 TypeScript 构建的 ESLint 模块扁平化配置，提供了基础的预设规则。

## 特性

- 基于 TypeScript 开发的 ESLint 扁平化预设配置。
- 自动检测项目安装依赖，自动启动对应的配置。
- 可自定义选择启用/禁用的规则集，每个规则集支持覆盖/添加规则。
- 支持添加自定义配置，可以为项目支持添加对应插件和规则。

## 快速开始

### 安装

```bash
pnpm install @nafsifan/eslint-config eslint
```

### 配置

在项目根目录创建 `eslint.config.js`：

```javascript
import { nafsifan } from '@nafsifan/eslint-config'

export default nafsifan()
```

### VSCode 设置

添加到 `.vscode/settings.json`：

```json
{
	// Disable the default formatter, use eslint instead
	"editor.defaultFormatter": "dbaeumer.vscode-eslint",
	"prettier.enable": false,
	"editor.formatOnSave": false,
	"eslint.useFlatConfig": true,
	"eslint.format.enable": true,
	// Auto fix
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": "explicit",
		"source.organizeImports": "never"
	},

	// Silent the stylistic rules in you IDE, but still auto fix them
	"eslint.rules.customizations": [
		{ "rule": "style/*", "severity": "off", "fixable": true },
		{ "rule": "format/*", "severity": "off", "fixable": true },
		{ "rule": "*-indent", "severity": "off", "fixable": true },
		{ "rule": "*-spacing", "severity": "off", "fixable": true },
		{ "rule": "*-spaces", "severity": "off", "fixable": true },
		{ "rule": "*-order", "severity": "off", "fixable": true },
		{ "rule": "*-dangle", "severity": "off", "fixable": true },
		{ "rule": "*-newline", "severity": "off", "fixable": true },
		{ "rule": "*quotes", "severity": "off", "fixable": true },
		{ "rule": "*semi", "severity": "off", "fixable": true }
	],

	// Enable eslint for all supported languages
	"eslint.validate": [
		"javascript",
		"javascriptreact",
		"typescript",
		"typescriptreact",
		"vue",
		"json",
		"json5",
		"jsonc"
	]
}
```

## 配置选项

### 默认配置

```javascript
import { nafsifan } from '@nafsifan/eslint-config'

export default await nafsifan({
	// 默认启用，JavaScript 格式化规则
	javascript: true,

	// 默认启用，Eslint 注释格式化规则
	comments: true,

	// 默认启用，JavaScript 现代化实践，规则增强
	unicorn: true,

	// 默认启用，代码风格格式化规则
	stylistic: true,

	// 默认启用，约束和校验 JSDoc 风格的注释规则
	jsdoc: true,

	// 默认启用，JSON 和 JSONC 的语法检查和规则
	jsonc: true,

	// 默认启用，约束 `import/export` 的使用，避免路径和模块问题
	imports: true,

	// 默认启用，代码排序规则
	sort: true,

	// 默认启用，指定 ESLint 忽略的文件或目录（自动合并根目录 .gitignore）
	ignores: true,

	// 默认启用，Node.js 规则
	node: true,

	// 自动检测并开启，TypeScript 格式化规则
	typescript: true,

	// 自动检测并开启，React 格式化规则，包括 JSX、a11y、Hooks
	react: true,

	// 自动检测并开启，Vue 格式化规则
	vue: true,

	// 自动检测并开启，Next.js 格式化规则
	nextjs: true,

	// 自动检测并开启，TailwindCSS 格式化规则，包含类名排序
	tailwindcss: true,
})
```

### 自定义配置

```javascript
import { nafsifan } from '@nafsifan/eslint-config'

export default await nafsifan({
	// 禁用某些默认预设规则
	stylistic: false,

	// 特定配置的规则覆盖
	typescript: {
		overrides: {
		'@typescript-eslint/no-explicit-any': 'warn'
		}
	},

	// 忽略配置：默认 useGitignore: true，可关闭或自定义路径
	ignores: {
		useGitignore: true,
		gitignorePath: '.gitignore',
		patterns: ['**/fixtures/**']
	},
	
	// Tailwind 配置支持 
	// https://github.com/schoero/eslint-plugin-better-tailwindcss?tab=readme-ov-file#quick-start
	tailwindcss: {
		// tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
		"entryPoint": "src/global.css",
		// tailwindcss 3: the path to the tailwind config file (eg: `tailwind.config.js`)
		"tailwindConfig": "tailwind.config.js"
	}

	// 全局规则覆盖
	overrides: {
		'no-console': 'off',
		'prefer-const': 'error'
	},

	// 自定义配置
	customConfigs: [
		{
		name: 'test-files',
		files: ['**/*.test.{js,ts}'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off'
		}
		}
	]
})
```

## 致谢

部分配置和规则参考：<code>[@antfu/eslint-config](https://github.com/antfu/eslint-config)</code>

## 许可证

[MIT](./LICENSE) License © 2025 Nafsi F.
