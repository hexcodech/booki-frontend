import { combineReducers } from "redux";

const bookDetails = (state = { query: "", toggled: false }, action) => {
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

		case "SEARCHBAR_TOGGLE":
			return {
				...state,
				toggled: action.toggled
			};

		default:
			return state;
	}
};

export default bookDetails;
