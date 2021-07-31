import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import ssr from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	preprocess: [
		mdsvex(mdsvexConfig),
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

export default config
