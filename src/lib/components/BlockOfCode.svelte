<script lang="ts">
	import { setContext } from 'svelte'

	export let language = 'text'
	export let title = 'title'

	let lines = 0
	setContext('LineNumber', {
		index: () => ++lines,
	})
</script>

<code {...$$props}>
	<slot />
</code>
