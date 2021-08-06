/**
 * @type {import('@types/eslint').Linter.Config}
 */
 module.exports = {
	plugins: ['jsdoc'],
	extends: ['plugin:jsdoc/recommended'],
	rules: {
		'jsdoc/require-jsdoc': 'off',
	},
}
