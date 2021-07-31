<script lang="ts">
	import { mountTheme } from '$lib/theme'
	import { onMount } from 'svelte'
	import '../global.postcss'
	onMount(mountTheme())
</script>

<main>
	<slot />
</main>
