<script lang="ts">
	import { browser } from '$app/env'

	export let source = ''
  export let language = 'text'
	export let title = 'title'
	export let highlight
	export let id
	export let numbers

	let transformed
	if (!browser) {
		transformed = globalThis.shiki.codeToHtml(source, {lang: language})
	}
</script>

<figure class="code" id={id} data-highlight={highlight} data-numbers={numbers}>
	{#if title}
		<figcaption>{title}</figcaption>
	{/if}
	{@html transformed}
</figure>
