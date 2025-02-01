<script>
	import { kebabCase } from 'es-toolkit';
	import Field from './Field.svelte';
	let { name, value, mutator, fieldDescription, fieldValidationMessage } = $props();
</script>

{#snippet textbox()}
	<input
		type="date"
		name={kebabCase(name)}
		id={kebabCase(name)}
		{value}
		oninput={(e) => {
			const textbox = e.target;
			mutator(textbox?.value);
		}}
	/>
{/snippet}

<Field fieldName={name} {fieldDescription} fieldPlaceholder={textbox} {fieldValidationMessage} />

<style>
	input[type='date'] {
		min-width: 13rem;
	}
</style>
