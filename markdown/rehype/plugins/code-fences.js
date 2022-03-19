import { visit } from 'unist-util-visit'
import { isTag } from '../utils/is-tag.js'

//import { getHighlighter as configureShiki } from 'shiki'
//const shiki = configureShiki({theme: 'nord'})

/**
 * Parse and transform code fences.
 *
 * @typedef {import('@types/unist').Node} Node
 * @type {(tree: Node) => null}
 */
const codeFences = async tree => {
	visit(tree, { type: 'element' }, node => {
		if (!isTag(node, 'pre')) {
			return
		}

		const { children } = node
		const isChildAlone = children?.[1] === undefined
		const child = children?.[0]
		if (!isChildAlone || !isTag(child, 'code')) {
			return
		}

		const { className, meta } = child.properties
		const language = className
			?.filter(c => c.startsWith('language-'))
			?.map(c => `language="${c.slice(9)}"`)?.[0]

		//console.error(`NODE:`, { node, child, meta, language })
	})
}

export default () => codeFences
