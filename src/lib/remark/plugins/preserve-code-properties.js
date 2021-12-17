import { visit } from 'unist-util-visit'
import { parse } from 'svelte-parse'

const preserveCodeProperties = tree => {
	visit(tree, 'code', node => {
		if (node.data === undefined) node.data = {}
		const { meta, lang, data, value } = node

		if (data.hProperties === undefined) data.hProperties = {}
		const { hProperties } = data

		// Exposes the source as a prop
		// Useful if we want to process it in our code component instead
		// of just mounting it in the default slot
		if (value !== undefined) {
			hProperties.source = value
		}

		// Exposes language as a prop
		if (lang !== undefined) {
			hProperties.language = lang
		}

		// Exposes props from the meta line
		if (meta !== undefined) {
			const properties = parse({
				value: `<Foo ${meta} />`,
				generatePositions: false,
			})
			.children[0]
			.properties
			?.map(({name, value}) => ({...value[0], name}))

			for (const property of properties) {
				const { name, expression, value: input } = property

				// Properties with no value are just truish
				let value = '{true}'

				// Input values are passed as-is
				if (input !== undefined) value = input

				// Expressions are enclosed in curly braces
				else if (expression !== undefined) value = `{${expression.value}}`

				hProperties[name] = value
			}
		}
	})
}

export default () => preserveCodeProperties
