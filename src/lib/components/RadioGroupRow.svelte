<script>
	import { kebabCase, startCase } from 'es-toolkit';
	let {
		radioName,
		radioOptions,
		radioValue,
		radioMutate,
		fieldLabel = startCase(radioName),
		fieldDescription,
		fieldValidationMessage
	} = $props();
	const radioName2 = kebabCase(radioName);
</script>

{#snippet fieldPlaceholder()}
	{#each radioOptions as [key, value]}
		{@const k = kebabCase(key)}
		{@const v = value.toString()}
		{@const isChecked = v == radioValue}
		{@const id = `${radioName2}-${k}`}
		<div class="flex-item button-item">
			<input
				type="radio"
				name={radioName2}
				id={id}
				value={v}
				checked={isChecked}
				onclick={() => radioMutate(value)}
			/>
			<label for={id} class={isChecked ? 'is-checked' : ''}>{startCase(key)}</label>
		</div>
	{/each}
{/snippet}

<div class="field flex-row">
	<div class="label-row field-indicator">
		<div>{fieldLabel}</div>
		<div class="field-description">{fieldDescription}</div>
	</div>
	{@render fieldPlaceholder()}
	<div class="label-row field-validation-message">{fieldValidationMessage}</div>
</div>
