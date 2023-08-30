/**
* Sort the array of movies provided by the field provided.
* @param {array} array - The array of movies.
* @param {string} sortBy - The field to sort by. It is the form of: 
	`<sort_field>.<sort_order_abbreviation>` e.g. 'vote_average.asc' where the field is `vote_average` 
	and the sort order is ascending. Valid values for sort_order_abbreviation are: `asc` and `desc`.
* @return {array} A sorted array.
*/
export function sortMovies(array, sortBy) {
	let parts = sortBy.split(".");
	let field = parts[0];
	let order = parts[1];

	if (field === "release_date") {
    return sortMoviesByReleaseDate(array, order);
  }
	
  return sort(array, field, order);
}

function sortMoviesByReleaseDate(array, order = "desc") {
	let sorted;

	if(order === "desc"){
		sorted = array.sort(
			(a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
		);
	}
	else if(order === "asc"){
		sorted = array.sort(
			(a, b) => Date.parse(a.release_date) - Date.parse(b.release_date));
	}

	return sorted;
}

export function sort(array, field, order) {
  return array.sort(compareValues(field, order));
}

function compareValues(key, order = "desc") {
  return function innerSort(a, b) {
    if (
      !Object.prototype.hasOwnProperty.call(a, key) ||
      !Object.prototype.hasOwnProperty.call(b, key)
    ) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}
