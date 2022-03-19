const DEFAULT_IMG_CONFIG = {
	srcset: 'width=200;400;800;1600',
	sizes: '100vw',
}

const configurations = {
	markdown: {
		sizes: '40vw',
	},
	boo: {
		srcset: 'width=480;1600',
		sizes: '10vw',
	},
}

export const getImageConfiguration = (name, fallback) =>
	Object.assign({}, DEFAULT_IMG_CONFIG, fallback ?? {}, configurations[name] ?? {})
