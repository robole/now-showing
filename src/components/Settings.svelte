<script>
	import {
		latestMovies,
		showSettings,
		selectedLanguageCode,
		languages,
		selectedCountryCode,
		countries,
		sortField,
		sortOrder,
		numOfPagesShown,
		minRating,
		minDuration,
		minVotes,
		fromDate,
		maxRating,
		maxDuration,
		maxVotes,
		toDate,
		loading,
	} from "../store";

	import { fetchMoviesDetailed } from "../scripts/tmdb";
	import { onMount } from "svelte";

	let dialog;
	let languageCode = $selectedLanguageCode;
	let countryCode = $selectedCountryCode;
	let dirty = false;

	onMount(() => {
		dialog.showModal();
	});

	function initDialog(node) {
		dialog = node;
	}

	function close() {
		dialog.close();
		$showSettings = false;
	}

	async function save() {
		if (dirty) {
			$latestMovies = [];
			$loading = true;

			$selectedLanguageCode = languageCode;
			$selectedCountryCode = countryCode;

			close();

			$numOfPagesShown = 1;

			let movies = await fetchMoviesDetailed(`${$sortField}.${$sortOrder}`, {
				languageCode: $selectedLanguageCode,
				countryCode: $selectedCountryCode,
				page: $numOfPagesShown,
				minRating: $minRating,
				maxRating: $maxRating,
				minVotes: $minVotes,
				maxVotes: $maxVotes,
				minDuration: $minDuration,
				maxDuration: $maxDuration,
				releaseDateFrom: $fromDate,
				releaseDateTo: $toDate,
			});

			$latestMovies = movies;
			$loading = false;
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
		<label for="languageSetting">Language</label>
		<select
			id="languageSetting"
			bind:value={languageCode}
			on:change={() => (dirty = true)}
		>
			{#each $languages as l}
				<option value={l.iso_639_1} selected={l.iso_639_1 === languageCode}
					>{l.english_name}</option
				>
			{/each}
		</select>
		<label for="countrySetting">Country</label>
		<select
			id="countrySetting"
			bind:value={countryCode}
			on:change={() => (dirty = true)}
		>
			{#each $countries as c}
				<option value={c.iso_3166_1}>{c.english_name}</option>
			{/each}
		</select>
		<button type="button" on:click={save}>Save</button>
		<button on:click={close}>Cancel</button>
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
