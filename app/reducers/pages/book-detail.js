import { combineReducers } from "redux";

const bookDetails = (state = { offerId: false, message: "" }, action) => {
	switch (action.type) {
		case "PAGES_BOOK_DETAIL_SET_OFFER_ID":
			return {
				...state,
				offerId: action.offerId
			};
		case "PAGES_BOOK_DETAIL_RESET_OFFER_ID":
			return {
				...state,
				offerId: false
			};

		case "PAGES_BOOK_DETAIL_UPDATE_MESSAGE":
			return {
				...state,
				message: action.message
			};

		default:
			return state;
	}
};

export default bookDetails;
