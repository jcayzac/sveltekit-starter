/**
 * @typedef {import('@types/hast').Element} Element
 * @type {(Element, string) => boolean}
 */
export const isTag = (element, tag) => {
	const { tagName } = element
	return tagName === tag || tagName === `Components.${tag}`
}
