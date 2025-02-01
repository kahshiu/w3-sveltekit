<script>
	import { kebabCase, startCase } from 'es-toolkit';
	import FieldGroup from './FieldGroup.svelte';
	let {
		radioName,
		radioOptions,
		radioValue,
		radioMutate,
		fieldLabel = startCase(radioName),
		fieldDescription,
		fieldValidationMessage
	} = $props();
	const radioName2 = kebabCase(radioName)
</script>

{#snippet radios()}
	{#each radioOptions as [key, value]}
		{@const k = kebabCase(key)}
		{@const v = value.toString()}
		{@const isChecked = v == radioValue}
		<input
			type="radio"
			name={radioName2}
			id={k}
			value={v}
			checked={isChecked}
			onclick={() => radioMutate(value)}
		/>
		<label for={k} class={isChecked? 'is-checked': ''}>{v} - {startCase(key)}</label>
		<br />
	{/each}
{/snippet}

<FieldGroup {fieldLabel} {fieldDescription} fieldPlaceholder={radios} {fieldValidationMessage} />
