<script>
	let { target, ref } = $props();
	let isPinned = $state(false);
</script>

<div class="content">
	<div class="content-target">
		{#if target}
			{@render target?.()}
		{:else}
			Target content here
		{/if}
	</div>
	<div class="content-ref {isPinned ? 'hello' : 'bellow'}">
		<button onclick={() => (isPinned = !isPinned)}>Toggle</button>
		<div>
			{#if target}
				{@render ref?.()}
			{:else}
				Drawing reference here
			{/if}
		</div>
	</div>
</div>
