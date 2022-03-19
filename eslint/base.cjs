/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://eslint.org/docs/user-guide/configuring/
 */
module.exports = {
	root: true,
	extends: ['eslint:recommended'],
	overrides: [
		{
			files: '*.js',
			rules: {
				'@typescript-eslint/explicit-module-boundary-types': 'off',
			},
		},
		{
			files: '*.cjs',
			parserOptions: {
				sourceType: 'script',
				extraFileExtensions: ['.cjs'],
			},
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
			},
		},
	],
	ignorePatterns: ['.svelte-kit', 'build', 'node_modules', 'package-lock.json'],
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
