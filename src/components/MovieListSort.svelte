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
	>Sort:
	<select name="sort" id="sort" bind:value={$sortByField} on:change={sort}>
		<option value="vote_average">Rating (highest to lowest)</option>
		<option value="runtime">Duration (longest to shortest)</option>
		<option value="release_date">Release Date (newest to oldest)</option>
	</select>
</label>

<style>
	label {
		display: inline-block;
		margin-block-end: 0.5rem;
	}

	select {
		margin-inline-start: 0.5rem;
		padding-inline-start: 0.3rem;
	}
</style>
