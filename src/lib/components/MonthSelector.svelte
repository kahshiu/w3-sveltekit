<script>
	import { kebabCase } from 'es-toolkit';
	import Field from './Field.svelte';
	let { name, value, mutator, fieldDescription, fieldValidationMessage } = $props();
	const monthObj = {
		"Not Selected": 0,
		JAN: 1,
		FEB: 2,
		MAR: 3,
		APR: 4,
		MAY: 5,
		JUN: 6,
		JUL: 7,
		AUG: 8,
		SEP: 9,
		OCT: 10,
		NOV: 11,
		DEC: 12
	};
	const months = Object.entries(monthObj);
</script>

{#snippet textbox()}
	<select
		name={kebabCase(name)}
		id={kebabCase(name)}
		onchange={(e) => {
			const value = e.target;
			mutator(value);
		}}
	>
		{#each months as [k, v]}
			{@const isSelected = v == value}
			<option value={v} selected={isSelected}>{v} - {k.toUpperCase()}</option>
		{/each}
	</select>
{/snippet}

<Field fieldName={name} {fieldDescription} fieldPlaceholder={textbox} {fieldValidationMessage} />

<style>
    select {
        min-width: 13rem;
        padding: 0.3rem;
    }
</style>
