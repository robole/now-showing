<script>
	import { latestMovies, sortByField } from "../store";
	import { sortMoviesBy } from "../scripts/sort";

	function sort() {
		if ($latestMovies.length > 0) {
			$latestMovies = sortMoviesBy($latestMovies, $sortByField);
		}
	}
</script>

<label
	>Sort
	<select name="sort" id="sort" bind:value={$sortByField} on:change={sort}>
		<option value="vote_average">Rating (highest first)</option>
		<option value="runtime">Duration (longest first)</option>
		<option value="release_date">Release Date (newest first)</option>
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
