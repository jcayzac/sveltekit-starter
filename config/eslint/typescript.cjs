/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://github.com/typescript-eslint/typescript-eslint#readme
 */
module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['plugin:@typescript-eslint/recommended'],
	plugins: ['@typescript-eslint'],
}
