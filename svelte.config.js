import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import { imagetools } from 'vite-imagetools'
import ssr from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'
import path from 'path'
import { promises as fs, constants as FS } from 'fs'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	preprocess: [
		mdsvex(mdsvexConfig),
		//imagePreprocessor,
		preprocess({
			//defaults: {
			//	style: 'postcss',
			//},
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
			plugins: [
				imagetools(),
				(() => {
					const PREFIX = '@testprefix/'
					const EXTENSION = '.md2'
					const routes = path.resolve('src/routes')

					const exists = async (path) => {
						try {
							await fs.access(path, FS.R_OK)
							return true
						} catch {
							return false
						}
					}

					const routeToPath = async (route) => {
						const basePath = path.join(routes, route)
						const basePathWithExtension = basePath + EXTENSION
						const indexPath = path.join(basePath, 'index' + EXTENSION)
						const filePath = (await exists(basePathWithExtension))
							? basePathWithExtension
							: ((await exists(indexPath))
								? indexPath
								: undefined)
						if (filePath !== undefined) {
							return PREFIX + filePath
						}
					}

					const resolveId = async (id) => {
						console.error(`>>> RESOLVING:`, id)
						if (id.endsWith(EXTENSION)) {
							return
						}
						return routeToPath(id)
					}

					const load = (id) => {
						console.error(`>>> LOADING:`, id)
						if (id.startsWith(PREFIX)) {
							console.error(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
							return `export const msg = 'hello'`
						}
					}

					return {
						name: 'test',
						resolveId,
						load,
					}
				})(),
			],
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
