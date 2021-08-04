import articles from '$lib/articles'
import type { RequestHandler, EndpointOutput } from '@sveltejs/kit'

const body = (x) => ({ body: x })
const notFound = () => ({ status: 404 })

const handleIndexRequest = async (query): Promise<EndpointOutput> => {
	return body({articles:[...articles.entries()].map(([slug, module]) => {
		const { metadata } = module
		return { slug, ...metadata }
	})})
}

const handleArticleRequest = async (slug): Promise<EndpointOutput | undefined> => {
	const article = articles.get(slug)
	if (article !== undefined) {
		const { metadata } = article
		return body({ slug, ...metadata })
	}
	return undefined
}

export const get: RequestHandler = async ({ params, query }): Promise<EndpointOutput> => {
	const { slug } = params
	console.error(`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
	if (slug === 'index') return await handleIndexRequest(query)

	const articleResponse = handleArticleRequest(slug)
	if (articleResponse !== undefined) return articleResponse

	return notFound()
}
