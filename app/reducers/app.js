import {combineReducers}
       from 'redux';

//import reducers
import authentication
       from 'core/reducers/auth';

import validation
       from 'core/reducers/validation';

import dashboard
       from 'app/reducers/dashboard';

import users
       from 'core/reducers/users';
import newUser
       from 'core/reducers/user/new';

import clients
       from 'core/reducers/clients';
import newClient
       from 'core/reducers/client/new';

import people
       from 'core/reducers/people';
import newPerson
       from 'core/reducers/person/new';
import lookedUpPeople
      from 'core/reducers/person/looked-up';

import conditions
       from 'core/reducers/conditions';
import newCondition
       from 'core/reducers/condition/new';

import books
       from 'core/reducers/books';
import newBook
       from 'core/reducers/book/new';
import lookedUpBooks
       from 'core/reducers/book/looked-up';

import thumbnailTypes
       from 'core/reducers/thumbnail-types';
import newThumbnailType
       from 'core/reducers/thumbnail-type/new';

import images
       from 'core/reducers/images';

import offers
       from 'core/reducers/offers';
import newOffer
       from 'core/reducers/offer/new';

import notifications
       from 'core/reducers/notifications';



export default combineReducers({
	authentication,
	validation,
	dashboard,

	newUser,
	users,

	newClient,
	clients,

  newPerson,
  people,
  lookedUpPeople,

  newCondition,
  conditions,

	newBook,
	books,

  lookedUpBooks,

  newThumbnailType,
  thumbnailTypes,

  images,

  newOffer,
  offers,

	notifications
});
