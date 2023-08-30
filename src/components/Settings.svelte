<script>
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import Spinner from "./Spinner.svelte";

	export let selectedLanguageCode;
	export let selectedCountryCode;
	export let countries;
	export let languages;

	let dialog;
	let dirty = false;
	const dispatch = createEventDispatcher();

	onMount(() => {
		dialog.showModal();
	});

	function initDialog(node) {
		dialog = node;
	}

	function close() {
		dialog.close();
		dispatch("closeSettings");
	}

	async function save() {
		if (dirty) {
			dispatch("saveSettings", { selectedLanguageCode, selectedCountryCode });
			close();
		}
	}

	function handleKeyup(e) {
		if (e.key === "Escape") {
			close();
		}
	}
</script>

<div class="bg modalBackground" on:click|self={close} on:keyup={handleKeyup}>
	<dialog aria-labelledby="settingsTitle" use:initDialog on:keyup={handleKeyup}>
		<h2 id="settingsTitle">Regional settings</h2>
		{#if languages.length === 0}
			<Spinner />
		{:else}
			<label for="languageSetting">Language</label>
			<select
				id="languageSetting"
				bind:value={selectedLanguageCode}
				on:change={() => (dirty = true)}
			>
				{#each languages as language}
					<option
						value={language.iso_639_1}
						selected={language.iso_639_1 === selectedLanguageCode}
						>{language.english_name}</option
					>
				{/each}
			</select>
			<label for="countrySetting">Country</label>
			<select
				id="countrySetting"
				bind:value={selectedCountryCode}
				on:change={() => (dirty = true)}
			>
				{#each countries as country}
					<option value={country.iso_3166_1}>{country.english_name}</option>
				{/each}
			</select>
			<button type="button" on:click={save}>Save</button>
			<button on:click={close}>Cancel</button>
		{/if}
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

	:global(.spinner) {
		place-self: center;
	}

	h2 {
		padding: 0;
		padding: 0.5rem 0;
		border-bottom: 1px solid grey;
		margin-bottom: 1rem;
		color: var(--primary-color);
		font-family: var(--sans-font-family);
		font-size: 1.25rem;
		text-align: center;
		text-transform: none;
	}

	select {
		padding: 0.5rem;
		font-size: 1.1rem;
	}
</style>
