/**
 * @type {import('@types/eslint').Linter.Config}
 * @see https://github.com/sveltejs/eslint-plugin-svelte3#readme
 */
module.exports = {
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': true,
	},
}
