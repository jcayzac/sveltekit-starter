import { visit } from 'unist-util-visit'
import { isTag } from '../utils/is-tag.js'

/**
 * Promotes lone elements of a paragraph to block elements if they have allowed tag names.
 *
 * @typedef {import('@types/unist').Node} Node
 * @type {(tree: Node) => Promise<Node>}
 */
const blockify = async tree => {
	visit(tree, { type: 'element' }, node => {
		if (!isTag(node, 'p')) {
			return
		}

		const { children } = node
		if (children?.length !== 1) {
			return
		}

		const child = children[0]
		validateTag: {
			for (const tag of ['img', 'picture', 'figure', 'svg', 'iframe', 'video', 'object']) {
				if (isTag(child, tag)) break validateTag
			}
			return
		}

		for (const property of Object.getOwnPropertyNames(node)) delete node[property]

		for (const property of Object.getOwnPropertyNames(child)) node[property] = child[property]
	})
}

export default () => blockify
