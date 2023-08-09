<script>
	import { latestMovies } from "../store";
	import { truncate } from "../scripts/format";

	let expanded = false;
	let filter = false;
	let minRating = 0;
	let maxRating = 10;
	let minDuration = 0;
	let maxDuration = 300;
	let minVotes = 0;
	let maxVotes = 1000000;

	function filterMovies() {
		let filteredMovies;

		if (filter) {
			filteredMovies = $latestMovies.map((movie) => {
				if (
					filterByRating(movie) ||
					filterByRuntime(movie) ||
					filterByVotes(movie)
				) {
					movie.show = false;
				} else {
					movie.show = true;
				}

				return movie;
			});

			$latestMovies = filteredMovies;
		}
	}

	function filterByRating(movie) {
		let filtered = true;
		let rating = truncate(movie.vote_average);

		if (rating >= minRating && rating <= maxRating) {
			filtered = false;
		}

		return filtered;
	}

	function filterByVotes(movie) {
		let filtered = true;
		let votes = movie.vote_count;

		if (votes >= minVotes && votes <= maxVotes) {
			filtered = false;
		}

		return filtered;
	}

	function filterByRuntime(movie) {
		let filtered = true;
		let { runtime } = movie;

		if (runtime >= minDuration && runtime <= maxDuration) {
			filtered = false;
		}

		return filtered;
	}

	function resetFilter() {
		if (filter) {
			minRating = 0;
			maxRating = 10;
			minDuration = 0;
			maxDuration = 300;
			minVotes = 0;
			maxVotes = 1000000;

			let resetMovies = $latestMovies.map((movie) => {
				movie.show = true;
				return movie;
			});

			$latestMovies = resetMovies;

			filter = false;
		}
	}
</script>

<div class="movieListFilter">
	<header>
		<h2>Filter</h2>
		<button
			class="disclosure-button"
			aria-expanded={expanded}
			aria-controls="content"
			on:click={() => (expanded = !expanded)}
			title="Reveal contents"
		>
			<svg viewBox="0 0 24 24" aria-label="Reveal contents">
				<path
					d="m6.7122 9.3082 5.2911 5.7121 5.2957-5.7456"
					fill="none"
					stroke="var(--secondary-color)"
					stroke-width="2"
				/>
			</svg>
		</button>
	</header>
	<div class="content" aria-hidden={!expanded}>
		<!-- .inner div is req for disclosure behaviour -->
		<div class="inner">
			<div class="buttonGroup">
				<button
					class="btnApply"
					type="button"
					on:click|preventDefault={filterMovies}>Apply Filters</button
				>
				<button
					class="btnReset"
					type="reset"
					on:click|preventDefault={resetFilter}>Reset Filters</button
				>
			</div>
			<div class="filter">
				<h3>Rating</h3>
				<label for="minRating">Min:</label>
				<input
					type="number"
					name="minRating"
					id="minRating"
					bind:value={minRating}
					on:input={() => (filter = true)}
					min="0"
					max="10"
					size="3"
					required
				/>
				<label for="maxRating">Max:</label>
				<input
					type="number"
					name="maxRating"
					id="maxRating"
					bind:value={maxRating}
					on:input={() => (filter = true)}
					min="0"
					max="10"
					size="3"
					required
				/>
			</div>
			<div class="filter">
				<h3>Votes</h3>
				<label for="minVotes">Min:</label>
				<input
					type="number"
					name="minVotes"
					id="minVotes"
					bind:value={minVotes}
					on:input={() => (filter = true)}
					min="0"
					size="6"
					required
				/>
				<label for="maxDuration">Max:</label>
				<input
					type="number"
					name="maxVotes"
					id="maxVotes"
					bind:value={maxVotes}
					on:input={() => (filter = true)}
					min="0"
					size="6"
					required
				/>
			</div>
			<div class="filter">
				<h3>Duration (minutes)</h3>
				<label for="minDuration">Min:</label>
				<input
					type="number"
					name="minDuration"
					id="minDuration"
					bind:value={minDuration}
					on:input={() => (filter = true)}
					min="0"
					max="360"
					size="3"
					required
				/>
				<label for="maxDuration">Max:</label>
				<input
					type="number"
					name="maxDuration"
					id="maxDuration"
					bind:value={maxDuration}
					on:input={() => (filter = true)}
					min="0"
					max="360"
					size="3"
					required
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.movieListFilter {
		width: 100%;

		margin: 0 auto;
		margin-block-end: 1rem;

		font-size: 1.1rem;
	}

	header {
		padding: 0.25rem 2px;
		margin-block-end: 0.5rem;
		border-radius: 5px;

		grid-row: 2;
		grid-column: 1 / -1;
	}

	.disclosure-button {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);

		border: none;
		padding: 0;
		box-shadow: none;
	}

	.disclosure-button svg {
		height: inherit;
		border: 1px solid var(--secondary-color);
		border-radius: 50%;

		margin: -0.2rem 0;

		transform: rotate(-90deg);
		transition: 300ms ease-in;
	}

	[aria-expanded="true"] svg {
		transform: rotate(0);
	}

	.content {
		display: grid;
		grid-template-rows: 1fr;
		padding: 0.1rem;
		overflow: initial;
		border: 1px solid var(--secondary-color);
		border-radius: 8px;

		transition: all 600ms ease-out;
	}

	.content .inner {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		align-content: center;
		align-items: start;
		row-gap: 0.75rem;
		column-gap: 1.5rem;

		width: 100%;
		padding: inherit;
		min-height: 0;

		background-color: white;
		border-radius: 5px;

		color: black;
		font-size: 1rem;
	}

	.content[aria-hidden="true"] {
		grid-template-rows: 0fr;
		padding: 0;
		overflow: hidden;

		/* without this, the border is visible too */
		border: 0px solid white;
	}

	.content[aria-hidden="true"] .buttonGroup {
		position: initial;
	}

	.buttonGroup {
		--margin: 0.5rem;

		position: sticky;
		top: calc(var(--header-height));
		grid-column: 1 / -1;

		width: calc(100% - 1rem);
		background-color: white;

		margin: 0.75rem var(--margin);
		padding: 0.5rem 0.25rem;
		border: 1px dotted var(--primary-color);
		border-radius: 8px;

		box-shadow: rgba(0 0 0 / 10%) 0 2px 2px;
	}

	@media screen and (min-width: 600px) {
		.buttonGroup {
			position: unset;
			top: unset;
		}
	}

	.filter {
		display: grid;
		grid-template-columns: auto auto;
		row-gap: 1rem;
		column-gap: 0.5rem;

		padding: 1rem 0.75rem;
		margin-inline: 0.5rem;
		border: 1px solid hsl(0, 1%, 1%, 0.3);

		border-radius: 4px;
	}

	.filter:last-child {
		margin-block-end: 0.5rem;
	}

	h2,
	h3 {
		font-family: var(--body-font-family);
		padding: 0;
		margin: 0;
		font-size: 1.1rem;
		text-transform: none;

		grid-column: span 2;
	}

	h2 {
		display: inline-block;
	}

	input[type="number"] {
		padding: 0.5em 0;
		padding-inline-start: 0.3rem;
	}
</style>
