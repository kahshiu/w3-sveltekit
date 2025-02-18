<script>
	const openModal = (el) => {
		el.showModal();
	};
	const createServiceHandler = () => {
		const id = 'x';
		const el = document.getElementById(id);
		openModal(el);
	};
</script>

<input type="button" value="Create Service" onclick={createServiceHandler} />
<dialog id="x">
	<p>Greetings, one and all!</p>
	<form method="POST">
		<input type="submit" formmethod="dialog" value="Cancel"/>
		<input type="submit" value="Submit"/>
	</form>
</dialog>

<style>
	dialog {
		position: fixed;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
		padding: 20px;
		background: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
</style>
