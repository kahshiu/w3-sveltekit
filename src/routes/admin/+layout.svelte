<script>
	let { children } = $props();
</script>

<div class="sidebar expanded">
	<nav>
		<ul class="stacked">
			<li><a href="/admin">Dashboard</a></li>
			<li><a href="/admin/config-services">Configure Services</a></li>
		</ul>
	</nav>
</div>
{@render children()}
