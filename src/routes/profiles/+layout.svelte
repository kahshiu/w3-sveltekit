<script>
	let { children } = $props();
</script>

<div class="sidebar expanded">
	<nav>
		<ul class="stacked">
			<li><a href="/profiles/create">Create Profile</a></li>
			<li><a href="/profiles">Search By Profile</a></li>
			<li><a href="/profiles/search-by-service">Search By Services</a></li>
			<li><a href="/profiles/mass-update">Mass Update</a></li>
		</ul>
	</nav>
</div>
{@render children()}
