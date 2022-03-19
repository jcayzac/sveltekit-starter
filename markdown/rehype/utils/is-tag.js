/**
 * @typedef {import('@types/hast').Element} Element
 * @type {(element: Element?, tag: string) => boolean}
 */
export const isTag = (element, tag) => {
	const { tagName, type } = { ...element }
	return type === 'element' && (tagName === tag || tagName === `Components.${tag}`)
}
