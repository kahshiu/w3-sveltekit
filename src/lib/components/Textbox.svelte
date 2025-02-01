<script>
	import { kebabCase, startCase } from 'es-toolkit';
	import Field from './Field.svelte';
	let {
		name,
		value,
		mutator,
		fieldDescription,
		fieldValidationMessage
	} = $props();
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

<Field fieldName={name} {fieldDescription} fieldPlaceholder={textbox} {fieldValidationMessage} />
