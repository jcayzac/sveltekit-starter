<script lang="ts">
	export let lineNumber
	export let highlighted

	let className
	$: {
		let classes = []
		if (highlighted !== undefined) classes.push('highlighted')
		if (lineNumber !== undefined) classes.push('show-number')
		className = classes.join(' ')
	}
</script>

<div class={className} data-line-number={lineNumber}><slot /></div>

<style>
	div::before {
		content: attr(data-line-number);
		display: inline-block;
		width: 3em;
		text-align: right;
		padding-right: 1em;
	}
</style>
