import { combineReducers } from "redux";

const defaultState = {
	step: 0,
	isbn: "",
	isbnAbout: false,
	isbn10: false,
	book: {
		isbn13: "",
		title: "",
		subtitle: "",
		publisher: "",
		authors: [],
		thumbnails: [],
		language: "",
		coverId: 0,
		pageCount: "",
		publicationDate: 0,
		verified: false
	},
	image: {
		width: 0,
		height: 0,
		mimeType: "",
		thumbnails: []
	},
	offer: {
		conditionId: 0,
		description: "",
		price: ""
	},
	nextEnabled: false,
	loading: false,
	fading: []
};

const sell = (state = defaultState, action) => {
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

		case "PAGES_SELL_UPDATE_BOOK":
			return {
				...state,
				book: { ...state.book, ...action.book }
			};

		case "PAGES_SELL_UPDATE_IMAGE":
			return {
				...state,
				image: { ...state.image, ...action.image }
			};

		case "PAGES_SELL_UPDATE_OFFER":
			return {
				...state,
				offer: { ...state.offer, ...action.offer }
			};

		case "PAGES_SELL_SET_NEXT_ENABLED":
			return { ...state, nextEnabled: action.nextEnabled };
		case "PAGES_SELL_SET_LOADING":
			return { ...state, loading: action.loading };

		case "PAGES_SELL_ADD_FADING":
			return { ...state, fading: [...state.fading, action.id] };

		case "PAGES_SELL_REMOVE_FADING":
			return {
				...state,
				fading: state.fading.filter(id => {
					return id !== action.id;
				})
			};
		case "PAGES_SELL_RESET":
			return { ...state, ...defaultState };

		case "PAGES_SELL_TOGGLE_ISBN10_INPUT":
			return { ...state, isbn10: !state.isbn10 };

		case "PAGES_SELL_TOGGLE_ISBN_ABOUT":
			return { ...state, isbnAbout: !state.isbnAbout };

		default:
			return state;
	}
};

export default sell;
