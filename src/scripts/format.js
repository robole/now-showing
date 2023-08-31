/** Return a float truncated to a number of decimal places
* @param {number} num - The number you want to truncate
* @param {number} [places=1] - The number of decimal places to truncate to
* @return {number} A truncated number.
*/
export function truncate(num, places=1) {
	return parseFloat(parseFloat(num).toFixed(places));
}

/** Format a date to yyyy-mm-dd
* @param {Date} date - The date you want to format
* @return {string} A formatted date.
*/
export function formatDate(date){
	let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
	let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
	let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
	return `${year}-${month}-${day}`;
}
