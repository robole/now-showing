<script>
	import { createEventDispatcher } from "svelte";
	import { onMount } from "svelte";

	export let message = "Uh oh! Something went wrong!";

	let dialog;
	const dispatch = createEventDispatcher();

	onMount(() => {
		dialog.showModal();
	});

	function initDialog(node) {
		dialog = node;
	}

	function close() {
		dialog.close();
		dispatch("closeErrorDialog");
	}

	async function handleKeyup(e) {
		if (e.key === "Escape") {
			close();
		}
	}
</script>

<div class="bg modalBackground" on:click|self={close} on:keyup={handleKeyup}>
	<dialog aria-labelledby="settingsTitle" use:initDialog>
		<button class="btnClose" on:click={close}>X</button>
		<h2>Error</h2>
		<p>{message}</p>
	</dialog>
</div>

<style>
	.bg {
		z-index: var(--zIndex2);
		display: flex;
		overflow: hidden;
		place-items: center;
	}

	dialog {
		position: relative;
		z-index: var(--zIndex3);
		display: flex;
		width: 90%;
		max-width: 24rem;
		flex-direction: column;
		padding: 2rem 1rem;
		padding-top: 0;
		margin: auto;

		background-color: white;
		row-gap: 1rem;
	}

	.btnClose {
		position: absolute;

		top: 0.5rem;
		right: 0.5rem;
		padding: 0.3em 0.4em;
		border: none;
		background-color: rgb(253 68 68);
		border-radius: 50%;
		box-shadow: rgb(0 0 0 / 20%) 0 2px 4px, rgb(0 0 0 / 10%) 0 3px 6px;
		color: white;
		cursor: pointer;
		font-family: var(--mono-font-family);
		font-size: 0.9rem;
		font-weight: bold;
	}

	h2 {
		padding: 0;
		padding: 0.6rem 0;
		border-bottom: 1px solid red;
		margin-bottom: 1rem;
		color: red;
		font-family: var(--sans-font-family);
		font-size: 1.25rem;
		text-align: center;
		text-transform: none;
	}
</style>
