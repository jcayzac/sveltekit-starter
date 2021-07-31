import { getHighlighter } from 'shiki'

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
	remarkPlugins: [],
	rehypePlugins: [],
	smartypants: {
		ellipses: true,
		dashes: true,
	},
}

export default config
