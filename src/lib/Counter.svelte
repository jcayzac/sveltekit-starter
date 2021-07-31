<script lang="ts">
	let count = 0

	const increment = (): void => {
		count += 1
	}
</script>

<button class="btn btn-secondary" on:click={increment}>
	Clicks: {count}
</button>
