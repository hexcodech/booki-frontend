import { combineReducers } from "redux";

const defaultState = { offerId: false, message: "", email: "" };

const bookDetails = (state = defaultState, action) => {
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
		case "PAGES_BOOK_DETAIL_RESET_OFFER_REQUEST":
			return defaultState;

		case "PAGES_BOOK_DETAIL_UPDATE_MESSAGE":
			return {
				...state,
				message: action.message
			};

		case "PAGES_BOOK_DETAIL_UPDATE_EMAIL":
			return {
				...state,
				email: action.email
			};

		default:
			return state;
	}
};

export default bookDetails;
