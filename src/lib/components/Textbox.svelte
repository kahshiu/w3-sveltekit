<script>
	import { kebabCase } from 'es-toolkit';
	import Field from './Field.svelte';
	let { name, value, mutator, fieldLabel = null, fieldDescription, fieldValidationMessage } = $props();
</script>

{#snippet textbox()}
	<input
		type="text"
		name={kebabCase(name)}
		id={kebabCase(name)}
		{value}
		oninput={(e) => {
			const textbox = e.target;
			mutator(textbox?.value);
		}}
	/>
{/snippet}

<Field
	{fieldLabel}
	fieldName={name}
	{fieldDescription}
	fieldPlaceholder={textbox}
	{fieldValidationMessage}
/>

<style>
	input[type='text'] {
		min-width: 13rem;
	}
</style>
