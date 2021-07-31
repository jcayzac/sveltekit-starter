<script context="module" lang="ts">
	export const prerender = true

	export const load = async({ fetch }) => {
		const response = await fetch(`./index.json`)
		const { articles } = await response.json()
		return {
			props: {
				articles,
			}
		}
	}
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte'
	import Timer from '$lib/Timer.svelte'
	import ToggleTheme from '$lib/ToggleTheme.svelte'
	import { theme } from '$lib/theme'

	export let articles
</script>

<div class="card lg:card-side bordered">
	<div class="card-body">
		<h2 class="text-5xl font-extrabold card-title">Hello {$theme} world!</h2>
		<blockquote class="text-xl p-2 mb-2 transition-colors duration-500">
			<a href="https://github.com/jcayzac/sveltekit-starter"><b>Github repo</b></a>
		</blockquote>
		<p>
			Visit the <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps. And
			read the <a href="https://kit.svelte.dev/">Official SvelteKit Documentation</a> to learn more about
			new features.
		</p>
		<Timer />
		<div class="card-actions">
			<ToggleTheme />
			<Counter />
		</div>
	</div>
</div>

<h2>Articles (Through endpoint)</h2>
<ul>
	{#each articles as {slug, title}}
		<li><a href="{slug}">{title}</a></li>
	{/each}
</ul>

<!-- a href="./boooooooooooooooooo">booooooooo</a -->

<figure class="mockup-code" data-title="boo">
	<pre data-prefix="1">
    <code>npm i daisyui</code>
  </pre>
	<pre data-prefix="2">
    <code>installing...</code>
  </pre>
	<pre data-prefix="3" class="bg-warning text-neutral">
    <code>Error!</code>
  </pre>
</figure>
