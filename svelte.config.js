import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import { imagetools } from 'vite-imagetools'
import ssr from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	preprocess: [
		mdsvex(mdsvexConfig),
		//imagePreprocessor,
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
		vite: {
			optimizeDeps: {
				include: ['blurhash'],
			},
			plugins: [imagetools()],
			resolve: {
				alias: {
					$images: path.resolve('src/images'),
					$routes: path.resolve('src/routes'),
				},
			},
		},
	},
}

export default config
