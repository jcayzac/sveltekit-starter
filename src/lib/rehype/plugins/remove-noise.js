import { remove } from 'unist-util-remove'

/**
 * @typedef {import('@types/unist').Node} Node
 * @type {(tree: Node) => null}
 */
const removeNoise = tree => remove(tree, { type: 'text', value: '\n' })

export default () => removeNoise
