<script>
	import Datebox from '$lib/components/Datebox.svelte';
	import MonthSelector from '$lib/components/MonthSelector.svelte';
	import RadioGroup from '$lib/components/RadioGroup.svelte';
	import RadioGroupRow from '$lib/components/RadioGroupRow.svelte';
	import Textbox from '$lib/components/Textbox.svelte';
	import { store } from '$lib/const/store';
	import { findKey, isString, startCase } from 'es-toolkit';
	import { isObject, some } from 'es-toolkit/compat';

	let { data, form } = $props();

	// page store
	let entityClass = $state(store.entityClass.CLIENT);
	let entityTypePrimary = $state(store.entityTypePrimary.COMPANY);

	let entityNameLabel = $derived(
		`${startCase(findKey(store.entityTypePrimary, (v) => v == entityTypePrimary))} Name`
	);
	let entityStatusLabel = $derived(
		`${startCase(findKey(store.entityTypePrimary, (v) => v == entityTypePrimary))} Status`
	);

	let isClient = $derived(
		[store.entityClass.CLIENT, store.entityClass.MASTER].includes(entityClass)
	);
	let isServiceProvider = $derived(
		[store.entityClass.SERVICE_PROVIDER, store.entityClass.MASTER].includes(entityClass)
	);
	let isCompany = $derived(entityTypePrimary == 1);
	let isPerson = $derived(entityTypePrimary == 2);

	let entityTypeSecondary = $state(0);
	let entityName = $state('');
	let entityStatus = $state(11);
	let coRegNoOld = $state(null);
	let coRegNoNew = $state(null);
	let employerNo = $state(null);
	let dateIncorp = $state(null);
	let dateCommence = $state(null);
	let yearEndMonth = $state(0);
	let arDueMonth = $state(0);
	let directorName = $state(null);
	let directorPassword = $state(null);

	let icType = $state(null);
	let icNo = $state(null);

	let incomeTaxNo = $state(null);
	let incomeTaxBranch = $state(null);
	let profileStatus = $state(0);

	// open
	let isOpened = $state(true);

	// updaters
	let entityClassUpdater = (value) => {
		entityClass = value;
	};
	let entityTypePrimaryUpdater = (value) => {
		entityTypePrimary = value;
	};
	let entityTypeSecondaryUpdater = (value) => {
		entityTypeSecondary = value;
	};
	let entityNameUpdater = (value) => {
		const transformed = value.toUpperCase();
		entityName = transformed;
	};
	let entityStatusUpdater = (value) => {
		entityStatus = value;
	};
	let coRegNoOldUpdater = (value) => {
		coRegNoOld = value.toUpperCase();
	};
	let coRegNoNewUpdater = (value) => {
		coRegNoNew = value.toUpperCase();
	};
	let employerNoUpdater = (value) => {
		employerNo = value.toUpperCase();
	};
	let dateIncorpUpdater = (value) => {
		dateIncorp = value;
	};
	let dateCommenceUpdater = (value) => {
		dateCommence = value;
	};
	let yearEndMonthUpdater = (value) => {
		yearEndMonth = value;
	};
	let arDueMonthUpdater = (value) => {
		arDueMonth = value;
	};
	let directorNameUpdater = (value) => {
		directorName = value.toUpperCase();
	};
	let directorPassworUpdater = (value) => {
		directorPassword = value;
	};

	let icTypeUpdater = (value) => {
		icType = value;
	};
	let icNoUpdater = (value) => {
		icNo = value;
	};
	let incomeTaxNoUpdater = (value) => {
		incomeTaxNo = value.toUpperCase();
	};
	let incomeTaxBranchUpdater = (value) => {
		incomeTaxBranch = value.toUpperCase();
	};
	let profileStatusUpdater = (value) => {
		profileStatus = value.toUpperCase();
	};

	// messages
	let entityClassMessage = $state('');
	let entityTypePrimaryMessage = $state('');
	let entityTypeSecondaryMessage = $state('');
	let entityNameMessage = $state('');
	let entityStatusMessage = $state('');
	let coRegNoOldMessage = $state('');
	let coRegNoNewMessage = $state('');
	let employerNoMessage = $state('');
	let dateIncorpMessage = $state('');
	let dateCommenceMessage = $state('');
	let yearEndMonthMessage = $state('');
	let arDueMonthMessage = $state('');
	let directorNameMessage = $state('');
	let directorPasswordMessage = $state('');

	let icTypeMessage = $state('');
	let icNoMessage = $state('');
	let incomeTaxNoMessage = $state('');
	let incomeTaxBranchMessage = $state('');
	let profileStatusMessage = $state('');

	let formDisabled = $derived.by(() => {
		const messages = [
			entityClassMessage,
			entityTypePrimaryMessage,
			entityTypeSecondaryMessage,
			entityNameMessage,
			entityStatusMessage,
			coRegNoOldMessage,
			coRegNoNewMessage,
			employerNoMessage,
			dateIncorpMessage,
			dateCommenceMessage,
			yearEndMonthMessage,
			arDueMonthMessage,
			directorNameMessage,
			directorPasswordMessage,

			icTypeMessage,
			icNoMessage,
			incomeTaxNoMessage,
			incomeTaxBranchMessage,
			profileStatusMessage
		];
		return some(messages, (item) => item.length > 0);
	});

	const validateField = (value, options) => {
		const { required } = options;
		if (required) {
			let message = 'This is a required field';
			if (isString(required)) {
				message = required;
			} else if (isObject(required) && required.fieldName) {
				message = `${required.fieldName} is a required field`;
			}

			const invalid = value === undefined || value === null || value === '';
			if (invalid) return message;
		}
		return '';
	};

	$effect(() => {
		entityClass;
		entityTypePrimary;
		console.log('reset all values');
	});

	$effect(() => {
		entityClassMessage = validateField(entityClass, {
			required: 'You must select one Entity Class to continue'
		});
		entityTypePrimaryMessage = validateField(entityTypePrimary, {
			required: 'You must select either Company or Person to continue'
		});
		entityNameMessage = validateField(entityName, {
			required: 'Entity name is required'
		});
		entityStatusMessage = validateField(entityStatus, {
			required: 'You must select an entity status'
		});

		// dependent validations
		let entityTypeSecondaryValidation = {};
		if (entityTypePrimary == 1) {
			entityTypeSecondaryValidation = {
				required: 'You must select either one of Company Type to continue'
			};
		}
		entityTypeSecondaryMessage = validateField(entityTypeSecondary, entityTypeSecondaryValidation);
	});
</script>

<div class="content">
	<div class="content-target">
		<div class="breadcrumb page-title">
			<div>Profiles</div>
			<div>New Profile</div>
		</div>

		{#if form?.status}
			<div class="error">
				Action encountered error<br />
				Error Code: {form.status} <br />
				Error Message: {form.statusText}
			</div>
		{/if}

		<form method="POST" action="?/create-entity">
			<div class="form-row">
				<div class="form-col">
					<fieldset>
						<legend>Entity Category</legend>
						<RadioGroupRow
							radioName={'entityClass'}
							radioValue={entityClass}
							radioOptions={Object.entries({
								CLIENT: 2,
								SERVICE_PROVIDER: 3,
								MASTER: 1
							})}
							radioMutate={entityClassUpdater}
							fieldLabel={''}
							fieldDescription={'Choose ONE class'}
							fieldValidationMessage={entityClassMessage}
						/>

						<RadioGroupRow
							radioName={'entityTypePrimary'}
							radioValue={entityTypePrimary}
							radioOptions={Object.entries(store.entityTypePrimary)}
							radioMutate={entityTypePrimaryUpdater}
							fieldLabel={''}
							fieldDescription={'Choose ONE type'}
							fieldValidationMessage={entityTypePrimaryMessage}
						/>
					</fieldset>
					<Textbox
						name={'entityName'}
						value={entityName}
						mutator={entityNameUpdater}
						fieldLabel={entityNameLabel}
						fieldDescription={`Type in entity name`}
						fieldValidationMessage={entityNameMessage}
					/>
					<RadioGroup
						radioName={'entityStatus'}
						radioOptions={Object.entries(store.entityStatus)}
						radioValue={entityStatus}
						radioMutate={entityStatusUpdater}
						fieldLabel={entityStatusLabel}
						fieldDescription="Select an entity status"
						fieldValidationMessage={entityStatusMessage}
					/>
					{#if isClient}
						<fieldset>
							<legend>Client Details</legend>
							<Textbox
								name={'incomeTaxNo'}
								value={incomeTaxNo}
								mutator={incomeTaxNoUpdater}
								fieldDescription={`Type in Income Tax No`}
								fieldValidationMessage={incomeTaxNoMessage}
							/>
							<Textbox
								name={'incomeTaxBranch'}
								value={incomeTaxBranch}
								mutator={incomeTaxBranchUpdater}
								fieldDescription={`Type in Income Tax Branch`}
								fieldValidationMessage={incomeTaxBranchMessage}
							/>
							<RadioGroup
								radioName={'profileStatus'}
								radioValue={profileStatus}
								radioOptions={Object.entries(store.profileStatus)}
								radioMutate={profileStatusUpdater}
								fieldLabel={'Client Profile Status'}
								fieldDescription={'Select Client Profile Status'}
								fieldValidationMessage={profileStatusMessage}
							/>
						</fieldset>
					{/if}
				</div>
				<div class="form-col">
					{#if isCompany}
						<fieldset>
							<legend>Company Details</legend>
							<RadioGroup
								fieldLabel={'Company Type'}
								radioName={'entityTypeSecondary'}
								radioValue={entityTypeSecondary}
								radioOptions={Object.entries(store.companyType)}
								radioMutate={entityTypeSecondaryUpdater}
								fieldDescription={'Select Company Type'}
								fieldValidationMessage={entityTypeSecondaryMessage}
							/>
							<Textbox
								name={'coRegNoNew'}
								value={coRegNoNew}
								mutator={coRegNoNewUpdater}
								fieldDescription={`Type in company reg no (new)`}
								fieldValidationMessage={coRegNoNewMessage}
							/>
							<Textbox
								name={'coRegNoOld'}
								value={coRegNoOld}
								mutator={coRegNoOldUpdater}
								fieldDescription={`Type in company reg no (old)`}
								fieldValidationMessage={coRegNoOldMessage}
							/>
							<Textbox
								name={'employerNo'}
								value={employerNo}
								mutator={employerNoUpdater}
								fieldDescription={`Type in Employer No`}
								fieldValidationMessage={employerNoMessage}
							/>
							<Datebox
								name={'dateIncorp'}
								value={dateIncorp}
								mutator={dateIncorpUpdater}
								fieldDescription={`Company Incorp. Date`}
								fieldValidationMessage={dateIncorpMessage}
							/>
							<Datebox
								name={'dateCommence'}
								value={dateCommence}
								mutator={dateCommenceUpdater}
								fieldDescription={`Company Commence Date`}
								fieldValidationMessage={dateCommenceMessage}
							/>
							<MonthSelector
								name={'yearEndMonth'}
								value={yearEndMonth}
								mutator={yearEndMonthUpdater}
								fieldDescription={`Select Year End Month`}
								fieldValidationMessage={yearEndMonthMessage}
							/>
							<MonthSelector
								name={'arDueMonth'}
								value={arDueMonth}
								mutator={arDueMonthUpdater}
								fieldDescription={`Select AR Month`}
								fieldValidationMessage={arDueMonthMessage}
							/>
						</fieldset>
						<fieldset>
							<legend>Director Login</legend>
							<Textbox
								name={'directorName'}
								value={directorName}
								mutator={directorNameUpdater}
								fieldDescription={`Type in Directore Name`}
								fieldValidationMessage={directorNameMessage}
							/>
							<Textbox
								name={'directorPassword'}
								value={directorPassword}
								mutator={directorPassworUpdater}
								fieldDescription={`Type in Director Password`}
								fieldValidationMessage={directorNameMessage}
							/>
						</fieldset>
					{/if}
					{#if isPerson}
						<fieldset>
							<legend>Person Details</legend>
							<RadioGroupRow
								radioName={'icType'}
								radioValue={icType}
								radioOptions={Object.entries(store.icType)}
								radioMutate={icTypeUpdater}
								fieldDescription={'Select person IC Type'}
								fieldValidationMessage={icTypeMessage}
							/>
							<Textbox
								name={'icNo'}
								value={icNo}
								mutator={icNoUpdater}
								fieldDescription={`Type in person IC`}
								fieldValidationMessage={icNoMessage}
							/>
						</fieldset>
					{/if}
				</div>
			</div>
			<input type="submit" value="Create Now" disabled={formDisabled} />
		</form>
	</div>
</div>

<style>
</style>
