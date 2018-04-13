// We define filtering registrants against a query string through
// name, email, and phone number
function filterRegistrants(registrants, query) {
	// We want the filtering to be case-insensitive
	query = query.toLowerCase();

	// Don't mind blank queries (i.e. queries that only contain spaces)
	if (query.trim().length < 1) {
		return registrants;
	}

	return registrants.filter(registrant => (
		registrant.name.toLowerCase().includes(query) ||
		registrant.email.toLowerCase().includes(query) ||
		registrant.phone.toLowerCase().includes(query)
	));
}

export default filterRegistrants;
