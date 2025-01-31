<script>
	let { children } = $props();
</script>

<header>
	<div>
		<h1>header here</h1>
	</div>
	<nav>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/profiles">Profiles</a></li>
			<li><a href="/tasks">Tasks</a></li>
			<li><a href="/admin">Admin</a></li>
		</ul>
	</nav>
</header>

{@render children()}

<footer>
	<div> Copy left </div>
	<div class="footer-right"> Copy right </div>
</footer>