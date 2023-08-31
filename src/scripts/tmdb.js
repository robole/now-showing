// API reference: https://developers.themoviedb.org/3/getting-started/introduction
import { totalPages } from "../store";
import { sort } from "./sort";

const BASE_URL = "https://api.themoviedb.org/3/";
const THEATRICAL_RELEASE__DATE_TYPE = 3;

/**
* Fetch the latest movies from TMDB.
* @param {string} sortBy - The field to sort by. It is the form of: 
	`<sort_field>.<sort_order_abbreviation>` e.g. 'vote_average.asc' where the field is `vote_average` 
	and the sort order is ascending. Valid values for sort_order_abbreviation are: `asc` and `desc`.
* @param {object} filterOptions - An object containing fields to filter the results by. The fields include:
* `languageCode`, `countryCode`, `page`, `releaseDateFrom`, `releaseDateTo`, `minRating`, `maxRating`, 
* `minVotes`, `maxVotes`, `minDuration`, `maxDuration`.
* @return {array} An array of movies.
*/
export async function fetchMovies(sortBy ="vote_average.desc", filterOptions = { page: 1}){
	let queryString = buildQueryString(sortBy, filterOptions);
	
	let response = await fetch(
    `${BASE_URL}discover/movie?api_key=${
      import.meta.env.VITE_API_KEY
    }${queryString}`
  );

  handleErrors(response);
  let res = await response.json();
  totalPages.set(res.total_pages);
  return res;
}

/**
 * Build the query string based on the sort and filter options provided for any of the TMDB endpoints.
 */
function buildQueryString(sortBy, filterOptions){
	let query = `&sort_by=${sortBy}&include_adult=true&with_release_type=${THEATRICAL_RELEASE__DATE_TYPE}`;

	if(filterOptions.languageCode !== undefined){
		query += `&language=${filterOptions.languageCode}-${filterOptions.countryCode}`;
	}

	if(filterOptions.countryCode !== undefined){
		query += `&region=${filterOptions.countryCode}`;
	}

	if(filterOptions.page !== undefined){
		query += `&page=${filterOptions.page}`;
	}

	if(filterOptions.releaseDateFrom !== undefined){
		query += `&release_date.gte=${filterOptions.releaseDateFrom}`;
	}

	 if(filterOptions.releaseDateTo !== undefined){
		query += `&release_date.lte=${filterOptions.releaseDateTo}`;
	}

	if(filterOptions.minRating !== undefined){
		query += `&vote_average.gte=${filterOptions.minRating}`;
	}

	if(filterOptions.maxRating !== undefined){
		query += `&vote_average.lte=${filterOptions.maxRating}`;
	}

	if(filterOptions.minVotes !== undefined){
		query += `&vote_count.gte=${filterOptions.minVotes}`;
	}

	if(filterOptions.maxVotes !== undefined){
		query += `&vote_count.lte=${filterOptions.maxVotes}`;
	}

	if(filterOptions.minDuration !== undefined){
		query += `&with_runtime.gte=${filterOptions.minDuration}`;
	}

	if(filterOptions.maxDuration !== undefined){
		query += `&with_runtime.lte=${filterOptions.maxDuration}`;
	}

	return query;
}

function handleErrors(response) {
  if (response.status === 404) {
    throw Error(
      "We have changed an endpoint and we shouldn't have had! Please let us know!"
    );
  } else if (!response.ok) {
    throw Error(
      "There was an issue with the network. Check your internet and try again."
    );
  }
}

/**
* Fetch a movie with provided ID and language code from TMDB. It includes details: release dates based on
* the country, trailers (videos), and credits.
* @param {string} movieId - The ID of the movie in TMDB.
* @param {string} languageCode - The language code in ISO 3166-1 format you want the results to be provided in. The 
* language codes in TMDB are usually mated to a country code in the format of `en-US` to provide more localized results.
* @return {array} An array of movies.
*/
export async function fetchMovieDetailed(movieId, languageCode = "en-IE") {
  let response = await fetch(
    `${BASE_URL}movie/${movieId}?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=${languageCode}&append_to_response=release_dates,videos,credits`
  );

  handleErrors(response);
  return response.json();
}

/**
* Fetch the latest movies from TMDB with detailed data. This includes: release dates based on
* the country code provided, trailers (videos), and credits.
* @param {string} sortBy - The field to sort by. It is the form of: 
* `<sort_field>.<sort_order_abbreviation>` e.g. 'vote_average.asc' where the field is `vote_average` 
* 	and the sort order is ascending. Valid values for sort_order_abbreviation are: `asc` and `desc`.
* @param {object} filterOptions - An object containing fields to filter the results by. The fields include:
* `languageCode`, `countryCode`, `page`, `releaseDateFrom`, `releaseDateTo`, `minRating`, `maxRating`, 
* `minVotes`, `maxVotes`, `minDuration`, `maxDuration`.
* @return {array} An array of movies.
*/
export async function fetchMoviesDetailed(sortBy ="vote_average.desc", filterOptions = { page: 1}){
  let fetchMoviePromises = [];
	let countryCode = filterOptions.countryCode || "IE"; // Ireland

  let basicMovies = await fetchMovies(sortBy, filterOptions);

  basicMovies.results.forEach((movie) => {
		let moviePromise;

		if(filterOptions.languageCode){
			 moviePromise = fetchMovieDetailed(movie.id, `${filterOptions.languageCode}-${filterOptions.countryCode}`);
		}
    else{
			fetchMovieDetailed(movie.id);
		}

    fetchMoviePromises.push(moviePromise);
  });

  let detailedMovies = await Promise.all(fetchMoviePromises);

  let detailedMoviesByCountry = processCountryDetails(detailedMovies, countryCode);

	// need to sort again because promises unsorts movies
	let sortedMovies = sort(detailedMoviesByCountry, sortBy);
  return sortedMovies;
}

/** Modify movie object to have country-specific release date and certification fields */
function processCountryDetails(movies, countryCode) {
  let updatedMovies = movies.map((movie) => {
    let releaseDatesObj = movie.release_dates.results.find(
      (item) => item.iso_3166_1 === countryCode
    );

    let countryReleaseDateObj;

    if (releaseDatesObj) {
      countryReleaseDateObj = releaseDatesObj.release_dates.find(
        (item) => item.type === THEATRICAL_RELEASE__DATE_TYPE
      );
    }

    let updatedMovie = movie;

    if (countryReleaseDateObj) {
			updatedMovie.release_date = countryReleaseDateObj.release_date;
      updatedMovie.certification = countryReleaseDateObj.certification ;
    }

    return updatedMovie;
  });

  return updatedMovies;
}

export async function fetchLanguages() {
  let response = await fetch(
    `${BASE_URL}configuration/languages?api_key=${import.meta.env.VITE_API_KEY}`
  );

  handleErrors(response);
  return response.json();
}

export async function fetchCountries() {
  let response = await fetch(
    `${BASE_URL}configuration/countries?api_key=${import.meta.env.VITE_API_KEY}`
  );

  handleErrors(response);
  return response.json();
}
