<script>
	import { latestMovies } from "../store";
	import { truncate } from "../scripts/format";

	let expanded = false;
	let dirty = false;
	let filter = false;

	const MIN_RATING = 0;
	const MAX_RATING = 10;
	const MIN_DURATION = 0;
	const MAX_DURATION = 300;
	const MIN_VOTES = 0;
	const MAX_VOTES = 99999999; /* 99.99 million */

	let minRating = MIN_RATING;
	let maxRating = MAX_RATING;
	let minDuration = MIN_DURATION;
	let maxDuration = MAX_DURATION;
	let minVotes = MIN_VOTES;
	let maxVotes = MAX_VOTES;

	function applyFilters() {
		let filteredMovies;

		if (dirty) {
			filter = true;
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

	function resetFilters() {
		dirty = false;

		minRating = MIN_RATING;
		maxRating = MAX_RATING;
		minDuration = MIN_DURATION;
		maxDuration = MAX_DURATION;
		minVotes = MIN_VOTES;
		maxVotes = MAX_VOTES;

		if (filter) {
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
		<h2 class:filter-on={filter}>Filter</h2>
		<button
			class="disclosure-button"
			aria-expanded={expanded}
			aria-controls="content"
			on:click={() => (expanded = !expanded)}
			title="Reveal filters"
		>
			<svg viewBox="0 0 24 24" aria-label="Reveal filters">
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
				<h3>
					Filters are <span class:hide={!filter}>on</span><span
						class:hide={filter}>off<span /></span
					>
				</h3>
				<button
					class="btnApply"
					type="button"
					on:click|preventDefault={applyFilters}>Apply Filters</button
				>
				<button
					class="btnReset"
					type="reset"
					on:click|preventDefault={resetFilters}>Reset Filters</button
				>
			</div>
			<form class="filter">
				<h3>Rating</h3>
				<label for="minRating">Min:</label>
				<input
					type="number"
					name="minRating"
					id="minRating"
					bind:value={minRating}
					on:input={() => (dirty = true)}
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
					on:input={() => (dirty = true)}
					min="0"
					max="10"
					size="3"
					required
				/>
			</form>
			<div class="filter">
				<h3>Votes</h3>
				<label for="minVotes">Min:</label>
				<input
					type="number"
					name="minVotes"
					id="minVotes"
					bind:value={minVotes}
					on:input={() => (dirty = true)}
					min="0"
					size="8"
					required
				/>
				<label for="maxDuration">Max:</label>
				<input
					type="number"
					name="maxVotes"
					id="maxVotes"
					bind:value={maxVotes}
					on:input={() => (dirty = true)}
					min="0"
					size="8"
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
					on:input={() => (dirty = true)}
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
					on:input={() => (dirty = true)}
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

		margin: -0.25rem 0;

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

		transition: all 300ms ease-in-out;
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

	.buttonGroup h3 {
		display: inline;
		margin-inline: 0.25rem;
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
		font-family: var(--sans-font-family);
		padding: 0;
		margin: 0;
		font-size: 1.1rem;
		text-transform: none;

		grid-column: span 2;
	}

	h2 {
		display: inline-block;
	}

	h2.filter-on {
		font-weight: bold;
	}

	h3 span {
		font-weight: bold;
	}

	.hide {
		display: none;
	}

	input[type="number"] {
		padding: 0.5em 0;
		padding-inline-start: 0.3rem;
	}

	label {
		align-self: center;
	}
</style>
