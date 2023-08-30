// API reference: https://developers.themoviedb.org/3/getting-started/introduction
import { totalPages } from "../store";
import { sort } from "./sort";

const BASE_URL = "https://api.themoviedb.org/3/";
const THEATRICAL_RELEASE__DATE_TYPE = 3;

export async function fetchMovies(sortBy ="vote_average.desc", filterOptions = { page: 1}){
	let queryString = getQueryString(sortBy, filterOptions);
	
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

function getQueryString(sortBy, filterOptions){
	let query = `&sort_by=${sortBy}&include_adult=true&with_release_type=${THEATRICAL_RELEASE__DATE_TYPE}`;

	if(filterOptions.languageCode !== undefined){
		query += `&language=${filterOptions.languageCode}`;
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
      "We have changed something and we shouldn't have had! Please let us know!"
    );
  } else if (!response.ok) {
    throw Error(
      "There was an issue with the network. Check your internet and try again."
    );
  }
}

export async function fetchMovieDetailed(movieId, languageCode = "en-US") {
  let response = await fetch(
    `${BASE_URL}movie/${movieId}?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=${languageCode}&append_to_response=release_dates,videos,credits`
  );

  handleErrors(response);
  return response.json();
}

export async function fetchMoviesDetailed(sortBy ="vote_average.desc", filterOptions = { page: 1}){
  let fetchMoviePromises = [];
	let countryCode = filterOptions.countryCode || "IE"; // Ireland

  let basicMovies = await fetchMovies(sortBy, filterOptions);

  basicMovies.results.forEach((movie) => {
		let moviePromise;

		if(filterOptions.languageCode){
			 moviePromise = fetchMovieDetailed(movie.id, filterOptions.languageCode);
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

/* Update movie with country-specific release date and certification */
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
