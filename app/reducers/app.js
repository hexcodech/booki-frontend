import { combineReducers } from "redux";

//import reducers
import authentication from "core/reducers/auth";

import validation from "core/reducers/validation";

import users from "core/reducers/users";

import lookedUpPeople from "core/reducers/person/looked-up";

import conditions from "core/reducers/conditions";

import books from "core/reducers/books";
import latestBookOffers from "core/reducers/book/latest";
import newBook from "core/reducers/book/new";
import lookedUpBooks from "core/reducers/book/looked-up";

import images from "core/reducers/images";

import offers from "core/reducers/offers";
import newOffer from "core/reducers/offer/new";

import offerRequests from "core/reducers/offer-requests";
import newOfferRequest from "core/reducers/offer-request/new";

import notifications from "core/reducers/notifications";

import pages from "app/reducers/pages";
import searchBar from "app/reducers/search-bar";

export default combineReducers({
	authentication,
	validation,

	users,

	lookedUpPeople,

	conditions,

	newBook,
	latestBookOffers,
	books,
	lookedUpBooks,

	images,

	offers,
	newOffer,

	offerRequests,
	newOfferRequest,

	notifications,

	searchBar,

	pages
});
