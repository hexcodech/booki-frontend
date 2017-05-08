export const nextStep = () => {
	return {
		type: "PAGES_SELL_NEXT_STEP"
	};
};

export const previousStep = () => {
	return {
		type: "PAGES_SELL_PREVIOUS_STEP"
	};
};

export const gotoStep = step => {
	return {
		type: "PAGES_SELL_GOTO_STEP",
		step
	};
};

export const updateIsbn = isbn => {
	return {
		type: "PAGES_SELL_UPDATE_ISBN",
		isbn
	};
};

export const updateBook = book => {
	return {
		type: "PAGES_SELL_UPDATE_BOOK",
		book
	};
};

export const updateImage = image => {
	return {
		type: "PAGES_SELL_UPDATE_IMAGE",
		image
	};
};

export const updateOffer = offer => {
	return {
		type: "PAGES_SELL_UPDATE_OFFER",
		offer
	};
};

export const setNextEnabled = nextEnabled => {
	return {
		type: "PAGES_SELL_SET_NEXT_ENABLED",
		nextEnabled
	};
};

export const setLoading = loading => {
	return {
		type: "PAGES_SELL_SET_LOADING",
		loading
	};
};

export const addFading = id => {
	return {
		type: "PAGES_SELL_ADD_FADING",
		id
	};
};

export const removeFading = id => {
	return {
		type: "PAGES_SELL_REMOVE_FADING",
		id
	};
};

export const resetSell = () => {
	return {
		type: "PAGES_SELL_RESET"
	};
};
