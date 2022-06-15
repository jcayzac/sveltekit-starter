<script context="module" lang="ts">
	import CodeFence from './CodeFence.svelte'
	import CodeLine from './CodeLine.svelte'
	import p from './Li2.svelte'
	import li from './Li.svelte'
	export { p, li, CodeFence, CodeLine }
</script>

<script>
	export let title
	export let hero
</script>

<img alt="hero" srcset={hero.srcSet} sizes={hero.sizes} />

<svelte:head>
	<title>{title}</title>
</svelte:head>

<article class="cooked">
	<style>
		a {
			@apply link;
		}
	
		ol,
		ul {
			list-style: square;
		}
	</style>

	<header>
		<h1>{title}</h1>
	</header>

	<slot />
</article>
