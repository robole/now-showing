<script>
	import { latestMovies, sortByField } from "../store";
	import { sortMoviesBy } from "../scripts/sort";
	import { truncate } from "../scripts/format";

	let filter = false;
	let minRating = 0;
	let maxRating = 10;
	let minDuration = 0;
	let maxDuration = 300;
	let minVotes = 0;
	let maxVotes = 1000000;

	function sort() {
		if ($latestMovies.length > 0) {
			$latestMovies = sortMoviesBy($latestMovies, $sortByField);
		}
	}

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

<section class="movieListFilter">
	<label
		>Sort:
		<select name="sort" id="sort" bind:value={$sortByField} on:input={sort}>
			<option value="vote_average">Rating</option>
			<option value="runtime">Duration</option>
			<option value="release_date">Release Date</option>
		</select>
	</label>
	<details class="filters">
		<summary>Filters</summary>
		<div class="controls">
			<div class="filter">
				<h2>Rating</h2>
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
				<h2>Votes</h2>
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
				<h2>Duration (minutes)</h2>
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
			<div class="buttonGroup">
				<button
					class="btnApply"
					type="button"
					on:click|preventDefault={filterMovies}
					disabled={!filter}>Apply Filters</button
				>
				<button
					class="btnReset"
					type="reset"
					on:click|preventDefault={resetFilter}
					disabled={!filter}>Reset Filters</button
				>
			</div>
		</div>
	</details>
</section>

<style>
	label {
		align-self: center;
	}

	select {
		padding-inline-start: 0.4em;
	}

	input[type="number"] {
		padding: 0.5em 0;
		padding-inline-start: 0.3rem;
	}

	label:nth-child(1) {
		display: block;
		margin-block-end: 1rem;
	}

	.movieListFilter {
		width: 100%;
		max-width: var(--max-width);
		padding: 0 var(--default-padding);

		margin: 0.5rem auto;

		font-size: 1.1rem;
	}

	.filters {
		padding: 0.25rem 2px;
		border-radius: 5px;

		grid-row: 2;
		grid-column: 1 / -1;
	}

	.filters summary {
		cursor: pointer;
	}

	.filters[open] {
		background-color: var(--primary-color);
		color: white;
	}

	.filters .controls {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		align-content: center;
		align-items: start;
		row-gap: 0.75rem;
		column-gap: 1.5rem;

		width: 100%;
		padding: 0.75rem 0.5rem;

		background-color: white;
		border-radius: 5px;
		box-shadow: rgb(0 0 0 / 40%) 0 0 2px, rgb(0 0 0 / 20%) 0 2px 4px;
		color: black;
		font-size: 1rem;
	}

	.filter {
		display: grid;
		grid-template-columns: auto auto;
		row-gap: 1rem;
		column-gap: 0.5rem;

		padding: 1rem 0.75rem;
		border: 1px solid hsl(0, 1%, 1%, 0.3);
		box-shadow: 0 0 2px hsl(0, 1%, 1%, 0.2);
		border-radius: 4px;
	}

	.filter h2 {
		font-family: var(--body-font-family);
		padding: 0;
		margin: 0;
		font-size: 1.1rem;
		text-transform: none;

		grid-column: span 2;
	}

	.buttonGroup {
		grid-column: 1 / -1;
	}
</style>
