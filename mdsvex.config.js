import rehypeRemoveNoise from './src/lib/rehype/plugins/remove-noise.js'
import rehypeBlockify from './src/lib/rehype/plugins/blockify.js'
import rehypeResponsiveImages from './src/lib/rehype/plugins/responsive-images.js'
import rehypeCodeFences from './src/lib/rehype/plugins/code-fences.js'
import remarkPreserveCodeProperties from './src/lib/remark/plugins/preserve-code-properties.js'
//import { highlight } from './src/lib/highlighter.js'

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
