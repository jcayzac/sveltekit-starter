import path from 'path'
import { visit } from 'unist-util-visit'
import { isTag } from '../utils/is-tag.js'
import { getImageConfiguration } from '../../image-configuration.js'

const HERO_IMAGE_CONFIGURATION = getImageConfiguration('hero')
const NORMAL_IMAGE_CONFIGURATION = getImageConfiguration('markdown')

// Resolve a source relatively to $routes
const resolve = (route, source) =>
	source.startsWith('$') ? source : `$routes${path.resolve(route, source)}`

// Make an import clause for the passes transformations
const makeImport = (name, source, transformations) =>
	`import ${name} from '${source}?${transformations}&webp&srcset';`

/**
 * Promotes lone elements of a paragraph to block elements if they have allowed tag names.
 *
 * @typedef {import('@types/unist').Node} Node
 * @type {(tree: Node) => Promise<Node>}
 */
const responsiveImages = async (tree, file) => {
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
		const [resolved, config] = resolve(route, hero).split('?')
		const { srcset, sizes } = getImageConfiguration(config, HERO_IMAGE_CONFIGURATION)
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

		console.error(`MODULE SCRIPT = ${moduleScript}`)
	}

	const imports = []
	let count = 0
	visit(tree, { type: 'element' }, node => {
		if (!isTag(node, 'img')) return

		const { src, alt, title } = node.properties

		// Ignore non-local images
		if (/^(?:[^:]+:)?\/\//.test(src)) return

		// Resolve the URL
		const [ resolved, config ] = resolve(route, src).split('?')
		const { srcset, sizes } = getImageConfiguration(config, NORMAL_IMAGE_CONFIGURATION)

		// Create an import for the srcset
		imports.push(makeImport(`SrcSet${count}`, resolved, srcset))
		node.properties.srcset = `{SrcSet${count}}`
		node.properties.sizes = sizes
		node.properties.loading=`lazy`
		delete node.properties.src
		if (config !== undefined) node.properties['data-responsive-config'] = config

		++count
	})

	visit(tree, { type: 'raw' }, node => {
		const { value } = node
		node.value = value
			.replace(
				/(?<=<script[^>]+?context=["']module["'][^>]*?>).+?(?=<\/script>)/s,
				source =>
					`
				${moduleScript}
				`,
			)
			.replace(
				/(?<=<script(?: lang=["']ts["'])?>).+?(?=<\/script>)/s,
				source =>
					`
				${source}
				${imports.join('\n')}
				`,
			)
	})

	tree.children = tree.children.filter(({ type, value }) => {
		return type !== 'text' || value !== '\n'
	})

	//console.error(`TREE`, JSON.stringify(tree.children, null, 2))
}

export default () => responsiveImages
