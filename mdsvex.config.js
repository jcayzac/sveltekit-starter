import { getHighlighter } from 'shiki'
import { visit } from 'unist-util-visit'
import { remove } from 'unist-util-remove'
import { select, selectAll } from 'hast-util-select'
import { h } from 'hastscript'
import path from 'path'
import { responsive } from './site.config.js'

/*
 * UTILS
 */

const isTag = (node, tag) => {
	const { type, tagName } = node
	return type === 'element' && (tagName === tag || tagName === `Components.${tag}`)
}

/*
 * REHYPE PLUGIN: REMOVE NOISE
 *
 * Removes noise from the tree
 */

const rehypeRemoveNoise = () => async(tree, file) => {
	remove(tree, { type: 'text', value: '\n' })
}

/*
 * REHYPE PLUGIN: BLOCKIFY
 *
 * Promotes lone elements of a paragraph to block elements if they have allowed tag names.
 */

const rehypeBlockify = () => async(tree, file) => {
	visit(tree, { type: 'element' }, node => {
		if (!isTag(node, 'p')) { return }

		const { children } = node
		if (children?.length !== 1) { return }

		const child = children[0]
		validateTag: {
			for (const tag of [ 'img', 'picture', 'figure', 'svg', 'iframe', 'video', 'object' ]) {
				if (isTag(child, tag)) break validateTag
			}
			return
		}

		for (const property of Object.getOwnPropertyNames(node))
			delete node[property]

		for (const property of Object.getOwnPropertyNames(child))
			node[property] = child[property]
	})
}

/*
 * REHYPE PLUGIN: RESPONSIVE
 *
 * Promotes lone elements of a paragraph to block elements if they have allowed tag names.
 */

const DEFAULT_IMG_CONFIG = {
	srcset: 'w=400;800;1600',
	sizes: '100vw',
}

const rehypeResponsive = (options) => {
	// Resolve a src relatively to $routes
	const resolve = (route, src) => src.startsWith('$') ? src : `$routes${path.resolve(route, src)}`

	// Make an import clause for a srcset
	const makeImport = (name, src, srcset) => `import ${name} from '${src}?${srcset}&webp&srcset';`

	// Get a configuration
	const configFor = (name, fallback) => Object.assign(fallback, options?.responsive?.[name])

	// Default config based on plugin options
	const defaultImgConfig = configFor('_default', DEFAULT_IMG_CONFIG)

	// Config for hero images
	const heroImgConfig = configFor('hero', defaultImgConfig)

	// Config for regular images
	const normalImgConfig = configFor('markdown', defaultImgConfig)

	return async(tree, file) => {
		const { filename, data } = file
		let { fm } = data
		const { hero } = fm

		// Things exported to the layout
		const route = `/${path.relative(path.resolve('src/routes'), path.dirname(filename))}`
		fm.route = route
		let moduleScript = `
		let _metadata = ${JSON.stringify(fm)}
		`
		if (hero !== undefined) {
			const [ resolved, config ] = resolve(route, hero).split('?')
			console.error(`RESOLVED:`, resolved)
			const { srcset, sizes } = configFor(config, heroImgConfig)
			moduleScript = `
			${makeImport('srcSet', resolved, srcset)}
			${moduleScript}
			const { ${Object.getOwnPropertyNames(fm).join(',')} } = _metadata;
			_metadata = {
				..._metadata,
				hero: {
					srcSet,
					sizes: \`${sizes}\`,
				},
			}
			export const metadata = _metadata;
			`
		}

		const imports = []
		let count = 0
		visit(tree, { type: 'element' }, node => {
			if (!isTag(node, 'img')) return;

			const { src, alt, title } = node.properties

			// Ignore non-local images
			if (/^(?:[^:]+:)?\/\//.test(src)) return;

			// Resolve the URL
			const [ resolved, config ] = resolve(route, src).split('?')
			const { srcset, sizes } = configFor(config, normalImgConfig)

			// Create an import for the srcset
			imports.push(makeImport(`SrcSet${count}`, resolved, srcset))
			node.properties.srcset = `{SrcSet${count}}`
			node.properties.sizes = sizes
			delete node.properties.src
			if (config !== undefined) node.properties['data-responsive-config'] = config

			++count
		})

		visit(tree, { type: 'raw'}, node => {
			const { value } = node
			node.value = value
				.replace(/(?<=<script[^>]+?context=["']module["'][^>]*?>).+?(?=<\/script>)/s, (source) =>
					`
					${moduleScript}
					`)
				.replace(/(?<=<script(?: lang=["']ts["'])?>).+?(?=<\/script>)/s, (source) =>
					`
					${source}
					${imports.join('\n')}
					`)
		})

		tree.children = tree.children.filter(({ type, value }) => {
			return type !== 'text' || value !== '\n'
		})

		console.error(`TREE`, JSON.stringify(tree.children, null, 2))

	}
}

const captionize = () => async(tree, file) =>
	visit(tree, { type: 'element', tagName: 'img' }, node => {
		const { properties, children } = node
		const { src, alt, title } = properties
		// Create a figure if the alt text is a caption
		const caption = /(?<=^caption:\s*).+$/.exec(alt)?.[0]
		if (caption !== null) {
			//console.error(`CAPTIONIZE:`, node)
		}
	})

const shiki = getHighlighter({
	theme: 'nord',
})

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
	extensions: ['.md'],
	layout: {
		_: 'src/lib/components/Markdown.svelte',
	},
	highlight: async (code, lang) => {
		const { codeToHtml } = await shiki
		return codeToHtml(code, lang)
	},
	remarkPlugins: [
		() => async(tree, file) => {
			//console.error(`MDAST:`, JSON.stringify(tree, null, 2))
		}
	],
	rehypePlugins: [
		rehypeRemoveNoise,
		[rehypeResponsive, { responsive }],
		captionize,
		rehypeBlockify,
	],
	smartypants: {
		ellipses: true,
		dashes: true,
	},
}

export default config
