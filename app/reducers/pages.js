import { combineReducers } from "redux";

import sell from "app/reducers/pages/sell";
import bookDetail from "app/reducers/pages/book-detail";

export default combineReducers({
	sell,
	bookDetail
});
