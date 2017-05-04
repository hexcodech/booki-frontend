import { addErrorNotification } from "booki-frontend-core/actions/notification";

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

export const updateIsbn = (isbn) => {
	return {
		type: "PAGES_SELL_UPDATE_ISBN",
    isbn
	};
};
