import { writable, derived } from "svelte/store";
import dayjs from "dayjs";

export let loading = writable(true);
export let latestMovies = writable([]);
export let selectedMovieTrailers = writable([]);

export let numOfPagesShown = writable(0);
export let totalPages = writable(1);

// sorting
export let sortBy = writable("vote_average.desc");

// filters
export let minRating = writable(0);
export let maxRating = writable(10);
export let minDuration = writable(0);
export let maxDuration= writable(300);
export let minVotes = writable(0);
export let maxVotes = writable(99999999);
export let fromDate = writable(dayjs(Date.now()).subtract(2, "month").format("YYYY-MM-DD"));
export let toDate = writable(dayjs(Date.now()).format("YYYY-MM-DD"));

// modal dialogs
export let showVideoPlayer = writable(false);
export let showError = writable(false);
export let showSettings = writable(false);
export let modalShown = derived([showVideoPlayer, showError, showSettings], ([$showVideoPlayer, $showError, $showSettings]) => $showVideoPlayer || $showError || $showSettings)

// error dialog
export let errorMessage = writable("");

// settings
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
