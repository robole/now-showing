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

<button
	class="disclosure-button"
	aria-expanded={expanded}
	aria-controls="content"
	on:click={() => (expanded = !expanded)}
	title="Reveal filters"
>
	<span class:filter-on={filter}>Filter</span>
	<svg viewBox="0 0 24 24" aria-label="Reveal filters">
		<path
			d="m6.7122 9.3082 5.2911 5.7121 5.2957-5.7456"
			fill="none"
			stroke="var(--secondary-color)"
			stroke-width="2"
		/>
	</svg>
</button>
<div class="content" aria-hidden={!expanded}>
	<div class="buttonGroup">
		<h3>
			Filters are <span class:hide={!filter} class="filter-on">on</span><span
				class:hide={filter}>off<span /></span
			>
		</h3>
		<button
			class="btnApply"
			type="button"
			on:click|preventDefault={applyFilters}>Apply</button
		>
		<button class="btnReset" type="reset" on:click|preventDefault={resetFilters}
			>Reset</button
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
	</div>
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
			size="6"
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

<style>
	.disclosure-button {
		display: inline-flex;
		align-items: center;
		gap: 0.25em;
		border: none;
		padding: 0.5em 0;
		margin-inline-start: 1em;
		box-shadow: none;

		font-weight: 300;
		color: black;
	}

	.disclosure-button svg {
		--size: 1.5em;
		width: var(--size);
		height: var(--size);

		border: 1px solid var(--secondary-color);
		border-radius: 50%;

		transform: rotate(-90deg);
		transition: transform 100ms ease-in;
	}

	[aria-expanded="true"] svg {
		transform: rotate(0);
	}

	.content {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		align-content: center;
		align-items: start;
		row-gap: 0.75rem;
		column-gap: 1.5rem;

		padding: 0.4rem 0.1rem;
		margin-block-end: 1rem;
		border: 1px solid var(--primary-color);
		border-radius: 8px;
		box-shadow: 0 0 3px 0 hsla(0, 0%, 0%, 0.15), 0 0 6px 0 hsl(0, 0%, 0%, 0.1);

		width: 100%;
		min-height: 0;
		font-size: inherit;

		background-color: white;
		border-radius: 5px;

		color: black;
	}

	.content::before {
		content: "";

		--height: 1.1em;
		position: absolute;
		top: calc(var(--height) * -1);
		left: 19.45em;

		width: 1.5em;
		height: var(--height);

		background-color: var(--secondary-color);
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	}

	.content[aria-hidden="true"] {
		display: none;
	}

	.buttonGroup {
		position: sticky;
		top: calc(var(--header-height));
		grid-column: 1 / -1;

		width: calc(100% - 1rem);
		background-color: white;

		margin-inline: 0.5rem;
		margin-block-end: 1rem;
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
		grid-template-columns: repeat(2, 1fr);
		row-gap: 1em;
		column-gap: 0.5em;

		padding-inline: 1em;

		margin-block-end: 1em;

		border-radius: 4px;
	}

	.filter:last-child {
		margin-block-end: 0.5rem;
	}

	.filter h3 {
		grid-column: span 2;
	}

	.filter input[type="number"] {
		max-width: 160px;
	}

	h2,
	h3 {
		font-family: var(--sans-font-family);
		padding: 0;
		margin: 0;
		font-size: 1.1rem;
		text-transform: none;
		font-weight: 300;
	}

	h2 {
		display: inline-block;
	}

	.filter-on {
		font-weight: 500;
		transition: font-weight 300ms ease-in-out;
	}

	.hide {
		display: none;
	}

	input[type="number"] {
		padding: 0.1em 0;
		padding-inline-start: 0.3rem;
	}

	label {
		font-weight: 200;
		align-self: center;
	}
</style>
