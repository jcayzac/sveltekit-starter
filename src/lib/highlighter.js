import { getHighlighter as configureShiki } from 'shiki'

const shiki = configureShiki({
	theme: undefined,
})

export const highlight = async (code, lang) => {
	const { codeToHtml, codeToThemedTokens } = await shiki
	const tokens = codeToThemedTokens(code, lang)
	console.error(`TOKENS:`, tokens)

	return tokens //  codeToHtml(code, lang)
}
