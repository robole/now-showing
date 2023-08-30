<script>
	import {
		latestMovies,
		showVideoPlayer,
		showSettings,
		showError,
		selectedLanguageCode,
		selectedCountryCode,
		selectedMovieTrailers,
		languages,
		countries,
		sortBy,
		totalPages,
		numOfPagesShown,
		loading,
		errorMessage,
		minRating,
		maxRating,
		minVotes,
		maxVotes,
		minDuration,
		maxDuration,
		fromDate,
		toDate,
	} from "../store";
	import {
		fetchMoviesDetailed,
		fetchLanguages,
		fetchCountries,
	} from "../scripts/tmdb";
	import { sort, sortMovies } from "../scripts/sort";

	import Header from "./Header.svelte";
	import SkeletonMovieList from "./SkeletonMovieList.svelte";
	import MovieList from "./MovieList.svelte";
	import MovieListSort from "./MovieListSort.svelte";
	import MovieListFilter from "./MovieListFilter.svelte";
	import VideoPlayer from "./VideoPlayer.svelte";
	import Settings from "./Settings.svelte";
	import Error from "./Error.svelte";
	import Footer from "./Footer.svelte";

	import { onMount } from "svelte";

	async function getLatestMovies(pageNum) {
		let movies = [];

		try {
			movies = await fetchMoviesDetailed($sortBy, {
				languageCode: $selectedLanguageCode,
				countryCode: $selectedCountryCode,
				page: pageNum,
				minRating: $minRating,
				maxRating: $maxRating,
				minVotes: $minVotes,
				maxVotes: $maxVotes,
				minDuration: $minDuration,
				maxDuration: $maxDuration,
				releaseDateFrom: $fromDate,
				releaseDateTo: $toDate,
			});
		} catch (error) {
			$errorMessage = error.message;
			$showError = true;
		}

		return movies;
	}

	async function showNextPage() {
		if ($numOfPagesShown < $totalPages) {
			$loading = true;
			$numOfPagesShown += 1;

			let movies = await getLatestMovies($numOfPagesShown);

			let allMovies = [...$latestMovies, ...movies];

			let sortedMovies = sortMovies(allMovies, $sortBy);
			$latestMovies = sortedMovies;

			$loading = false;
		}
	}

	async function handleSort(event) {
		resetMovieList();

		$sortBy = event.detail.value;

		await showNextPage();
	}

	async function handleFilter(event) {
		resetMovieList();

		$minRating = event.detail.minRating;
		$maxRating = event.detail.maxRating;
		$minVotes = event.detail.minVotes;
		$maxVotes = event.detail.maxVotes;
		$minDuration = event.detail.minDuration;
		$maxDuration = event.detail.maxDuration;
		$fromDate = event.detail.fromDate;
		$toDate = event.detail.toDate;

		await showNextPage();
	}

	function resetMovieList() {
		$numOfPagesShown = 0;
		$latestMovies = [];
	}

	onMount(async () => {
		// It could be left to the Header component to get this data,
		// however the UI is more responsive if we get the data ahead of time.
		try {
			await showNextPage();
			let unsortedLanguages = await fetchLanguages();
			let unsortedCountries = await fetchCountries();
			$languages = sort(unsortedLanguages, "english_name", "asc");
			$countries = sort(unsortedCountries, "english_name", "asc");
		} catch (error) {
			$errorMessage = error.message;
			$showError = true;
		}
	});
</script>

<Header />

<main inert={$showVideoPlayer || $showSettings || $showError}>
	<MovieListSort on:sort={(event) => handleSort(event)} />
	<MovieListFilter
		minRating={$minRating}
		maxRating={$maxRating}
		minVotes={$minVotes}
		maxVotes={$maxVotes}
		minDuration={$minDuration}
		maxDuration={$maxDuration}
		fromDate={$fromDate}
		toDate={$toDate}
		on:filter={(event) => handleFilter(event)}
	/>

	{#if $latestMovies.length > 0}
		<MovieList movies={$latestMovies} country={$selectedCountryCode} />
	{:else if $latestMovies.length === 0 && $loading === false}
		<h2>No movies found!</h2>
		<img
			src="img/no-movies-found.jpg"
			alt="An empty cinema. Indicative of no movies being shown."
			class="noMoviesImg"
			width="1064"
			height="784"
		/>
	{/if}

	{#if $latestMovies.length > 0 && $numOfPagesShown < $totalPages && $loading === false}
		<button on:click={showNextPage}>Show More</button>
	{/if}

	{#if $loading}
		<SkeletonMovieList />
	{/if}
</main>

{#if $showVideoPlayer}
	<VideoPlayer videos={$selectedMovieTrailers} />
{/if}

{#if $showSettings}
	<Settings />
{/if}

{#if $showError}
	<Error message={$errorMessage} />
{/if}

<Footer />

<style>
	main {
		width: 100%;
		max-width: var(--max-width);
		min-height: calc(100vh - var(--header-height));
		margin: 0 auto;
		margin-block-start: calc(var(--header-height) + 2rem);
		padding: 0 var(--default-padding);
	}

	h2 {
		margin: 2.5rem 0 2rem;
		color: var(--primary-color);
		font-size: 1.75rem;
		text-align: center;
	}

	button {
		display: block;
		padding: 0.75rem;
		margin: 1rem auto;
		font-size: 1.2rem;
	}

	.noMoviesImg {
		display: block;
		width: 100%;
		max-width: 1064px;
		margin: 0 auto;
		aspect-ratio: 4 / 3;
		margin-block-end: 2rem;
	}
</style>
