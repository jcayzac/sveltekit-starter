import ssr from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		preprocess({
			defaults: {
				style: 'postcss',
			},
			postcss: true,
		}),
	],

	kit: {
		adapter: ssr(),
		target: '#svelte',
	},
}
