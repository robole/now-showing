<script>
	import MovieCard from "./MovieCard.svelte";

	const baseImageUrl = "https://image.tmdb.org/t/p/w500";

	export let movies = [];
	export let country;

	function formatBackgroundImage(path) {
		if (path !== null) {
			return `${baseImageUrl}${path}`;
		}
		return "";
	}

	function getTrailers(movie) {
		let trailers = [];

		if (movie.videos && movie.videos.results) {
			trailers = movie.videos.results.filter(
				(video) => video.type === "Trailer" && video.site === "YouTube"
			);
		}
		return trailers;
	}

	function getDirectors(movie) {
		let directors = [];

		if (movie.credits && movie.credits.crew) {
			directors = movie.credits.crew.filter(
				(crewMember) => crewMember.job === "Director"
			);
		}

		return directors;
	}

	function getStarringActors(movie) {
		let actors = [];

		if (movie.credits && movie.credits.cast) {
			// top 3 actors
			actors = movie.credits.cast.filter(
				(castMember) =>
					castMember.known_for_department === "Acting" && castMember.order < 3
			);
		}
		return actors;
	}

	function getReleaseDate(movie) {
		let releaseDate = Date.now();
		const THEATRICAL_RELEASE_TYPE = 3;

		const foundCountryDates = movie.release_dates.results.find(
			(item) => item.iso_3166_1 === country
		);

		if (foundCountryDates !== undefined) {
			const foundDateObj = foundCountryDates.release_dates.find(
				(item) => item.type === THEATRICAL_RELEASE_TYPE
			);

			releaseDate = foundDateObj.release_date;
		}

		return releaseDate;
	}
</script>

<ul class="movieList">
	{#each movies as movie}
		{#if movie.show === undefined || movie.show === true}
			<MovieCard
				title={movie.title}
				overview={movie.overview}
				backgroundImage={formatBackgroundImage(movie.backdrop_path)}
				rating={movie.vote_average}
				certification={movie.certification}
				ratingCount={movie.vote_count}
				releaseDate={getReleaseDate(movie)}
				genres={movie.genres}
				runtime={movie.runtime}
				tagline={movie.tagline}
				trailers={getTrailers(movie)}
				directors={getDirectors(movie)}
				actors={getStarringActors(movie)}
			/>
		{/if}
	{/each}
</ul>

<style>
	.movieList {
		display: grid;
		width: 100%;
		padding: 0;

		margin: 0 auto;
		margin-block-end: 1rem;
		gap: 0.75rem;
		grid-auto-flow: dense;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

		list-style-type: none;
	}

	/* this prevent a 3rd card appearing in a row on desktop */
	@media screen and (min-width: 860px) {
		.movieList {
			grid-template-columns: repeat(2, minmax(400px, 1fr));
		}
	}
</style>
