// Exports all articles as modules
const relativeModules = import.meta.globEager('../routes/**/index.md')
export default new Map(
	Object.entries(relativeModules).map(([path, module]) => {
		const slug = path.replace(/^\.\.\/routes\/(.+)\/index\.md$/, '$1')
		return [slug, module]
	}),
)
