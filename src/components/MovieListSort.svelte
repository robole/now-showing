<script>
	import { latestMovies, sortField, sortOrder } from "../store";
	import { sortMovies } from "../scripts/sort";

	let value;

	function sort() {
		if (value.includes("|")) {
			let values = value.split("|");
			$sortField = values[0];
			$sortOrder = values[1];

			if ($latestMovies.length > 0) {
				$latestMovies = sortMovies($latestMovies, $sortField, $sortOrder);
			}
		} else {
			$sortField = value;

			if ($latestMovies.length > 0) {
				$latestMovies = sortMovies($latestMovies, $sortField);
			}
		}
	}
</script>

<label
	>Sort
	<select name="sort" id="sort" bind:value on:change={sort}>
		<option value="vote_average|desc">Rating (highest first)</option>
		<option value="vote_average|asc">Rating (lowest first)</option>
		<option value="runtime|desc">Duration (longest first)</option>
		<option value="runtime|asc">Duration (shortest first)</option>
		<option value="release_date|desc">Release Date (newest first)</option>
		<option value="release_date|asc">Release Date (oldest first)</option>
	</select>
</label>

<style>
	label {
		display: inline-block;
		padding-block-end: 1em;

		font-weight: 300;
		color: black;
	}

	select {
		margin-inline-start: 0.25em;
		padding-inline-start: 0.3em;
		color: var(--secondary-color);
		font-size: 0.9em;
	}
</style>
