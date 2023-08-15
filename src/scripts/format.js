export function truncate(num, places=1) {
	return parseFloat(parseFloat(num).toFixed(places));
}

export function formatDate(date){
	let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
	let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
	let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
	return `${year}-${month}-${day}`;
}
