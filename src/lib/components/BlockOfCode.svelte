<script lang="ts">
	export let language: string = 'text'
	export let title: string = 'title'

	import { setContext } from 'svelte'
	let lines = 0
	setContext('LineNumber', {
		index: () => ++lines,
	})
</script>

<code {...$$props}>
	<slot/>
</code>
