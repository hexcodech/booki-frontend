import { combineReducers } from "redux";

const sell = (
	state = {
		step: 0,
		isbn: ""
	},
	action
) => {
	switch (action.type) {
		case "PAGES_SELL_NEXT_STEP":
			return {
				...state,
				step: state.step + 1
			};
		case "PAGES_SELL_PREVIOUS_STEP":
			return {
				...state,
				step: state.step - 1
			};
		case "PAGES_SELL_GOTO_STEP":
			return {
				...state,
				step: action.step
			};

		case "PAGES_SELL_UPDATE_ISBN":
			return {
				...state,
				isbn: action.isbn
			};

		default:
			return state;
	}
};

export default sell;
