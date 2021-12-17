<script lang="ts">
	import { getContext } from 'svelte'
	const { lineNumber } = getContext('LineNumber') as { lineNumber?: number }
</script>

<code data-line-number={lineNumber}><slot /></code>
