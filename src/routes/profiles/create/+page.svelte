<script>
	import { afterNavigate } from '$app/navigation';
	import RadioGroup from '$lib/components/RadioGroup.svelte';
	import Textbox from '$lib/components/Textbox.svelte';
	import { isString } from 'es-toolkit';
	import { isObject, some } from 'es-toolkit/compat';

	// global store
	const store = {
		entityClass: {
			CLIENT: 2,
			SERVICE_PROVIDER: 3,
			MASTER: 1
		},
		entityPrimaryType: {
			COMPANY: 1,
			PERSON: 2
		}
	};

	// page store
	let entityClass = $state(store.entityClass.CLIENT);
	let entityPrimaryType = $state(store.entityPrimaryType.COMPANY);
	let isCompany = $derived(entityPrimaryType == 1);
	let entitySecondaryType = $state(null);
	let entityName = $state('');
	let entityStatus = $state(null);

	/*
	afterNavigate((navDetails) => {
		const { to } = navDetails;
		const key = to?.params?.entityPrimaryType;
		entityPrimaryType = store.entityPrimaryType[key.toUpperCase()];
	});
	*/

	// updaters
	let entityClassUpdater = (value) => {
		entityClass = value;
	};
	let entityPrimaryTypeUpdater = (value) => {
		entityPrimaryType = value;
	};
	let entitySecondaryTypeUpdater = (value) => {
		entitySecondaryType = value;
	};
	let entityNameUpdater = (value) => {
		const transformed = value.toUpperCase();
		entityName = transformed;
	};
	let entityStatusUpdater = (value) => {
		entityStatus = value;
	};

	// messages
	let entityClassMessage = $state('');
	let entityPrimaryTypeMessage = $state('');
	let entitySecondaryTypeMessage = $state('');
	let entityNameMessage = $state('');
	let entityStatusMessage = $state('');

	let formDisabled = $derived.by(()=>{
		const messages = [
			entityClassMessage,
			entityPrimaryTypeMessage,
			entitySecondaryTypeMessage,
			entityNameMessage,
			entityStatusMessage,
		];
		return some(messages,(item) => item.length > 0);
	})

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
		entityPrimaryType;
		console.log("reset all values")
	})

	$effect(() => {
		entityClassMessage = validateField(entityClass, {
			required: 'You must select one Entity Class to continue'
		});
		entityPrimaryTypeMessage = validateField(entityPrimaryType, {
			required: 'You must select either Company or Person to continue'
		});
		entityNameMessage = validateField(entityName, {
			required: 'Entity name is required'
		});
		entityStatusMessage = validateField(entityStatus, {
			required: 'You must select an entity status'
		});

		// dependent validations
		let entitySecondaryTypeValidation = {};
		if (entityPrimaryType == 1) {
			entitySecondaryTypeValidation = {
				required: 'You must select either one of Company Type to continue'
			};
		}
		entitySecondaryTypeMessage = validateField(entitySecondaryType, entitySecondaryTypeValidation);
	});
</script>

<div class="content">
	<div class="content-target">
		<div class="breadcrumb page-title">
			<div>Profiles</div>
			<div>New Profile</div>
		</div>

		<form method="POST" action="?/create-entity">
			<RadioGroup
				radioName={'entityClass'}
				radioValue={entityClass}
				radioOptions={Object.entries({
					CLIENT: 2,
					SERVICE_PROVIDER: 3,
					MASTER: 1
				})}
				radioMutate={entityClassUpdater}
				fieldDescription={'Select an entity class'}
				fieldValidationMessage={entityClassMessage}
			/>
			<RadioGroup
				radioName={'entityPrimaryType'}
				radioValue={entityPrimaryType}
				radioOptions={Object.entries(store.entityPrimaryType)}
				radioMutate={entityPrimaryTypeUpdater}
				fieldDescription={'Select primary type'}
				fieldValidationMessage={entityPrimaryTypeMessage}
			/>
			<Textbox
				name={'entityName'}
				value={entityName}
				mutator={entityNameUpdater}
				fieldDescription={`Type in entity name`}
				fieldValidationMessage={entityNameMessage}
			/>
			{#if isCompany}
				<RadioGroup
					fieldLabel={'Company Type'}
					radioName={'entitySecondaryType'}
					radioValue={entitySecondaryType}
					radioOptions={Object.entries({
						SOLE_PROP: 101,
						PARTNERSHIP: 102,
						SDN_BHD: 103,
						LIMITED_LIABILITY_PARTNERSHIP: 104
					})}
					radioMutate={entitySecondaryTypeUpdater}
					fieldDescription={'Select Company Type'}
					fieldValidationMessage={entitySecondaryTypeMessage}
				/>
			{/if}
			<RadioGroup
				radioName={'entityStatus'}
				radioOptions={Object.entries({ ACTIVE: 11, DORMANT: 101, STRIKE_OFF: 102 })}
				radioValue={entityStatus}
				radioMutate={entityStatusUpdater}
				fieldDescription="Select an entity status"
				fieldValidationMessage={entityStatusMessage}
			/>
			<input type="submit" value="Create Now" disabled={formDisabled}/>
		</form>
	</div>
</div>

<style>
	/*
	.field-group input[type='radio'] {
	}

	.field-group label {
		margin-right: 1.3rem;
	}
		*/
</style>
