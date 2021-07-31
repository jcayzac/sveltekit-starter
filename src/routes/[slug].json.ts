import articles from '$lib/articles'
import type { RequestHandler, EndpointOutput } from '@sveltejs/kit'

const body = (x) => ({ body: x })
const notFound = () => ({ status: 404 })

export const get: RequestHandler = async ({ params }): Promise<EndpointOutput> => {
	const { slug } = params

	if (slug == 'index') {
		return body({articles:[...articles.entries()].map(([slug, module]) => {
			const { metadata } = module
			return { slug, ...metadata }
		})})
	}

	const article = articles.get(slug)
	if (article !== undefined) {
		const { metadata } = article
		return body({ slug, ...metadata })
	}

	return notFound()
}
