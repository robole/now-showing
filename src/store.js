import { writable } from "svelte/store";
import dayjs from "dayjs";

export let latestMovies = writable([]);
export let selectedMovieTrailers = writable([]);

export let totalPages = writable(1);
export let numOfPagesShown = writable(1);

export let sortField = writable("vote_average");
export let sortOrder = writable("desc");

// filters
export let minRating = writable(0);
export let maxRating = writable(10);
export let minDuration = writable(0);
export let maxDuration= writable(300);
export let minVotes = writable(0);
export let maxVotes = writable(99999999);
export let fromDate = writable(dayjs(Date.now()).subtract(3, "month").format("YYYY-MM-DD"));
export let toDate = writable(dayjs(Date.now()).format("YYYY-MM-DD"));

export let showVideoPlayer = writable(false);

export let showError = writable(false);
export let errorMessage = writable("");

export let loading = writable(true);

// settings
export let showSettings = writable(false);

export let selectedLanguageCode = writable(
  localStorage.getItem("selectedLanguageCode") || "en"
);
selectedLanguageCode.subscribe((value) =>
  localStorage.setItem("selectedLanguageCode", value)
);

export let selectedCountryCode = writable(
  localStorage.getItem("selectedCountryCode") || "IE"
);
selectedCountryCode.subscribe((value) =>
  localStorage.setItem("selectedCountryCode", value)
);

export let languages = writable([]);
export let countries = writable([]);
