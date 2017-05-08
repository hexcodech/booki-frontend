export const setOfferId = offerId => {
	return {
		type: "PAGES_BOOK_DETAIL_SET_OFFER_ID",
		offerId
	};
};

export const resetOfferId = () => {
	return {
		type: "PAGES_BOOK_DETAIL_RESET_OFFER_ID"
	};
};

export const updateMessage = message => {
	return {
		type: "PAGES_BOOK_DETAIL_UPDATE_MESSAGE",
		message
	};
};
