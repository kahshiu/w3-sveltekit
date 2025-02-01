<script>
	import { kebabCase, startCase } from 'es-toolkit';

	let {
		fieldName,
		fieldLabel = startCase(fieldName),
		fieldDescription,
		fieldPlaceholder,
		fieldValidationMessage
	} = $props();

	const fieldId = kebabCase(fieldName);
</script>

<div class="field">
	<div class="field-indicator">
		<label for={fieldId}>{fieldLabel}</label>
		<div class="field-description">{fieldDescription}</div>
	</div>
	<div class="field-control">
		{@render fieldPlaceholder()}
		<div class="field-validation-message">
			{fieldValidationMessage}
		</div>
	</div>
</div>
