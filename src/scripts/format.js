export function truncate(num, places=1) {
	return parseFloat(parseFloat(num).toFixed(places));
}
