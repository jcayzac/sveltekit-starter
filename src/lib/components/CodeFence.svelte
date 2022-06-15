<script lang="ts">
  export let language = 'text'
	export let title = 'title'
	export let highlight
	export let id
	export let numbers
</script>

<figure id={id} data-highlight={highlight} data-numbers={numbers}>
{#if title}<figcaption>{title}</figcaption>{/if}
<pre><code><slot/></code></pre>
</figure>

<style>
	pre, pre > code {
		margin: 0;
		padding: 0;
		display: block;
	}
</style>
