export const updateText = query => {
	return {
		type: "SEARCHBAR_UPDATE_TEXT",
		query
	};
};

export const reset = () => {
	return {
		type: "SEARCHBAR_RESET"
	};
};
