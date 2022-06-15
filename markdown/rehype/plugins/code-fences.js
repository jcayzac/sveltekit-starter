import { visit } from 'unist-util-visit'
import { isTag } from '../utils/is-tag.js'
import { getHighlighter, setCDN } from 'shiki'
import { unified } from 'unified'
import { parseEntities } from 'parse-entities'
import { stringifyEntities } from 'stringify-entities'
import rehypeParse from 'rehype-parse'

const escapeText = (text) => {
	return stringifyEntities(text, { escapeOnly: false })
		.replace('{', '&#123;')
		.replace('}', '&#125;')
		.replace(' ', '&nbsp;')
}

const rangeEvaluator = (min, max) => (value) => value >= min && value <= max
const rangesEvaluator = (spec) => {
	const ranges = spec
		.split(',')
		.map(_ => _.split('-'))
		.map(([_min, _max]) => {
			const min = Number.parseInt(_min)
			const max = _max !== undefined ? Number.parseInt(_max) : min

			if (!Number.isNaN(min) && !Number.isNaN(max))
				return rangeEvaluator(min, max)
		})
		.filter(_ => _ !== undefined)

	return (value) => ranges.some(_ => _(value))
}

setCDN('./node_modules/shiki')
const theme = 'nord'
const shiki = getHighlighter({theme})

const resolveToken = (token) => {
	const { content, explanation } = token
	const { scopes } = explanation.slice(-1)[0]
	const { scopeName } = scopes.slice(-1)[0]
	const scope = scopeName.split('.')
	const className = scope.map((x, i) => scope.slice(0, i+1).join('-'))
	return {
		content,
		className,
	}
}

/**
 * Parse and transform code fences.
 *
 * @typedef {import('@types/unist').Node} Node
 * @type {(tree: Node) => null}
 */
const codeFences = async tree => {
	visit(tree, { type: 'element' }, async (node) => {
		if (!isTag(node, 'pre')) {
			return
		}

		const { children } = node
		const isChildAlone = children?.[1] === undefined
		const child = children?.[0]
		if (!isChildAlone || !isTag(child, 'code')) {
			return
		}

		const {
			id,
			highlight,
			language,
			numbers,
			source,
			title,
		} = child.properties

		const isInRange = highlight !== undefined ? rangesEvaluator(highlight) : () => false
		const raw = parseEntities(source)

		const highlighter = await shiki
		const lines = highlighter.codeToThemedTokens(raw, language)

		let transformedLines = []
		let lineNumber = 0
		for (const line of lines) {
			let children = []
			for (const token of line) {
				const { content, className } = resolveToken(token)

				children.push({
					type: 'element',
					tagName: 'span',
					properties: { className },
					children: [{
						type: 'text',
						value: escapeText(content),
					}],
				})
			}

			let lineClasses = [ 'line' ]
			const highlighted = isInRange(++lineNumber)
			if (highlighted) lineClasses = [ ...lineClasses, 'highlighted' ]
			transformedLines.push({
				type: 'element',
				tagName: 'Components.CodeLine',
				properties: Object.assign({},
					numbers !== undefined && { lineNumber },
					highlighted !== undefined && { highlighted },
				),
				children,
			})
		}

		delete child.properties.className
		delete child.properties.source
		delete node.children
		node.tagName = 'Components.CodeFence'
		node.children = transformedLines
		node.properties = Object.assign({},
			id !== undefined && { id },
			language !== undefined && { language },
			title !== undefined && { title },
			source !== undefined && { source },
			numbers !== undefined && { numbers },
		)
	})
}

export default () => codeFences
