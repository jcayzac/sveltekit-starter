import { getHighlighter as configureShiki } from 'shiki'

const shiki = configureShiki()

export const highlight = async (code, lang) => {
	const { codeToHtml } = await shiki
	return codeToHtml(code, lang)
}
