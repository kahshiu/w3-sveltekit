<script>
	let { children } = $props();
</script>

<main class="regular-view">
	<div class="sidebar expanded">
		<nav>
			<ul>
				<li><a href="/profiles/create">Create Profile</a></li>
				<li><a href="/profiles">Search By Profile</a></li>
				<li><a href="/profiles/services">Search By Services</a></li>
				<li><a href="/profiles/mass-update">Mass Update</a></li>
			</ul>
		</nav>
	</div>
	<div class="content">
		{@render children()}
	</div>
</main>
