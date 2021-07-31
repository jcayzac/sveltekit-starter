/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://eslint.org/docs/user-guide/configuring/
 */
const base = {
	root: true,
	extends: ['eslint:recommended'],
	ignorePatterns: ['*.cjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		yoda: 'error',
	},
}

/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://github.com/prettier/eslint-config-prettier#readme
 */
const prettier = {
	extends: ['prettier'],
}

/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://github.com/SonarSource/eslint-plugin-sonarjs#readme
 */
const sonarjs = {
	extends: ['plugin:sonarjs/recommended'],
	plugins: ['sonarjs'],
}

/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://github.com/sveltejs/eslint-plugin-svelte3#readme
 */
const svelte3 = {
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
}

/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://github.com/typescript-eslint/typescript-eslint#readme
 */
const typescript = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:@typescript-eslint/recommended'],
	plugins: ['@typescript-eslint'],
}

/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn#readme
 */
const unicorn = {
	extends: ['plugin:unicorn/recommended'],
	plugins: ['unicorn'],
}

const merge = require('deepmerge').all
module.exports = merge([base, prettier, sonarjs, svelte3, typescript, unicorn])
