<script>
	import { startCase } from 'es-toolkit';

	let { children, data } = $props();
	const { payload } = data;

	let entityType = null;
	let target = null;
	Object.entries(payload).forEach(([key, value]) => {
		if (value.length > 0) {
			entityType = key;
			target = value[0];
		}
	});
	let entityId = $state(target?.entityId);
</script>

<div class="content">
	<div class="content-target">
		<div class="breadcrumb page-title">
			<div>Profiles</div>
			<div>Edit Profile</div>
		</div>

		<h2>{startCase(entityType)}</h2>

		<nav>
			<ul class="horizontal" style="display: flex">
				<li><a class="" href="/profiles/{entityId}">Profile Details</a></li>
				<li>
					<a class="" href="/profiles/{entityId}/links">Linked Profiles</a>
				</li>
				<li><a class="" href="/profiles/{entityId}/services">Services</a></li>
			</ul>
		</nav>

		{@render children()}
	</div>
</div>

<style>
</style>
