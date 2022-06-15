import rehypeRemoveNoise from './rehype/plugins/remove-noise.js'
import rehypeBlockify from './rehype/plugins/blockify.js'
import rehypeResponsiveImages from './rehype/plugins/responsive-images.js'
import rehypeCodeFences from './rehype/plugins/code-fences.js'
import remarkPreserveCodeProperties from './remark/plugins/preserve-code-properties.js'

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
	extensions: ['.md'],
	layout: {
		_: 'src/lib/components/Markdown.svelte',
	},
	highlight: false,
	remarkPlugins: [remarkPreserveCodeProperties],
	rehypePlugins: [rehypeRemoveNoise, rehypeCodeFences, rehypeResponsiveImages, rehypeBlockify],
	smartypants: {
		ellipses: true,
		dashes: true,
	},
}

export default config
