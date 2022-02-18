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
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: ssr(),
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

					const exists = async path => {
						try {
							await fs.access(path, FS.R_OK)
							return true
						} catch {
							return false
						}
					}

					const resolveId = async route => {
						// Resolve the route to an absolute path
						const basePath = path.join(routes, route)

						// Try to find the index file
						const basePathWithExtension = basePath + EXTENSION
						const indexPath = path.join(basePath, 'index' + EXTENSION)
						const filePath = (await exists(basePathWithExtension))
							? basePathWithExtension
							: ((await exists(indexPath))
							? indexPath
							: undefined)

						if (filePath !== undefined) {
							return `${PREFIX}${filePath}.md2resolved`
						}
					}

					const load = id => {
						if (id.startsWith(PREFIX)) {
							// TODO: invole Svelte
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
