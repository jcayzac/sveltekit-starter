<script context="module" lang="ts">
	import p from './Li2.svelte'
	import li from './Li.svelte'
	export { p, li }
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
	<header>
		<h1>{title}</h1>
	</header>

	<slot />
</article>

<style>
	a {
		@apply link;
	}

	ol,
	ul {
		list-style: square;
	}
</style>
