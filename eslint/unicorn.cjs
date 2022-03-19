/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn#readme
 */
module.exports = {
	extends: ['plugin:unicorn/recommended'],
	plugins: ['unicorn'],
	rules: {
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/prevent-abbreviations': 'warn',
		'unicorn/consistent-function-scoping': 'warn',
		'unicorn/no-null': 'warn',
	},
}
