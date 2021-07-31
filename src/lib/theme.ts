import { browser } from '$app/env'
import { readable, writable, derived, Readable } from 'svelte/store'

// Returns 'light' if the media query list / event matches
function ligthIfMatch(event: MediaQueryList | MediaQueryListEvent) {
	return event.matches ? 'light' : 'dark'
}

// OS default color scheme
export const preferredColorScheme = readable('dark', set => {
	if (!browser)
		return () => {
			/* SSR */
		}

	const query = matchMedia('(prefers-color-scheme: light)')

	set(ligthIfMatch(query))
	const listener = (event: MediaQueryListEvent) => set(ligthIfMatch(event))

	query.addEventListener('change', listener)
	return () => query.removeEventListener('change', listener)
})

// LocalStorage-backed override
export const themeOverride = writable<string | undefined>()

if (browser) {
	const THEME_KEY = 'theme'

	// Save updates to local storage
	themeOverride.subscribe(value => {
		if (value !== undefined) localStorage.setItem(THEME_KEY, value)
		else localStorage.removeItem(THEME_KEY)
	})

	// Load initial value from local storage
	const value = localStorage.getItem(THEME_KEY)
	if (value !== null) themeOverride.set(value)
}

// Aggregate the two
export const theme: Readable<string> = derived(
	[preferredColorScheme, themeOverride],
	([preferredColorScheme, themeOverride], set) =>
		set(themeOverride !== undefined ? themeOverride : preferredColorScheme),
)

// Call this in onMount() in your layout
export const mountTheme = (): (() => void) =>
	theme.subscribe(value => {
		if (value === 'light') {
			const { documentElement } = document
			documentElement.dataset.theme = value
		}
	})
