<script>
	let { children } = $props();
</script>

<header>
	<div>
		<h1>WayMaker Client Management</h1>
	</div>
	<nav>
		<ul class="horizontal">
			<li><a href="/">Home</a></li>
			<li><a href="/profiles">Profiles</a></li>
			<li><a href="/tasks">Tasks</a></li>
			<li><a href="/admin">Admin</a></li>
		</ul>
	</nav>
</header>

<main class="regular-view">
	{@render children()}
</main>

<footer>
	<div> 
		Profiles | Tasks | Admin 
	</div>
	<div class="footer-right"> All rights Reserved @ 2024-2025, Waymaker Services Sdn Bhd </div>
</footer>