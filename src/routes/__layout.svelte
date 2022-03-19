<script context="module" lang="ts">
	import { getHighlighter, setCDN } from 'shiki'
	import { browser } from '$app/env'

	export async function load() {
		if (!browser) {
			// Setup a global "shiki" instance for components
			setCDN('https://unpkg.com/shiki/')
			const theme = 'nord'
			globalThis.shiki = await getHighlighter({theme})
		}

		return {
			status: 200,
		}
  }
</script>

<script lang="ts">
	import { mountTheme } from '$lib/theme'
	import { onMount } from 'svelte'
	import '../global.postcss'

	onMount(mountTheme())
</script>

<main>
	<slot />
</main>
