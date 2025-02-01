<script>
	let { fieldLabel, fieldDescription, fieldPlaceholder, fieldValidationMessage } = $props();
</script>

<div class="field">
	<div class="field-indicator">
		<div>{fieldLabel}</div>
		<div class="field-description">{fieldDescription}</div>
	</div>
	<div class="field-control">
		<div class="field-group">
			{@render fieldPlaceholder()}
		</div>
		<div class="field-validation-message">
			{fieldValidationMessage}
		</div>
	</div>
</div>
