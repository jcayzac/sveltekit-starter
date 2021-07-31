<script lang="ts">
	import { theme, themeOverride } from './theme'
	const toggleTheme = () => {
		$themeOverride = $theme === 'light' ? 'dark' : 'light'
		const { documentElement } = document
		documentElement.dataset.theme = $themeOverride
	}
</script>

<button class="btn btn-primary" on:click={toggleTheme}> Toggle Theme </button>
