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
		padding-block-end: 1rem;
		font-size: 1.1rem;
		color: black;
	}

	select {
		margin-inline-start: 0.25rem;
		padding-inline-start: 0.3rem;
		color: var(--secondary-color);
	}
</style>
