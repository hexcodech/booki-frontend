import { combineReducers } from "redux";

const bookDetails = (state = { query: "" }, action) => {
	switch (action.type) {
		case "SEARCHBAR_UPDATE_TEXT":
			return {
				...state,
				query: action.query
			};
		case "SEARCHBAR_RESET":
			return {
				...state,
				query: ""
			};

		default:
			return state;
	}
};

export default bookDetails;
