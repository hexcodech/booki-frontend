import {combineReducers}	from 'redux';

//import reducers
import authentication		from 'core/reducers/auth';

import users				from 'core/reducers/users';
import newUser				from 'core/reducers/user/new';

import clients				from 'core/reducers/clients';
import newClient			from 'core/reducers/client/new';

import books				from 'core/reducers/books';
import newBook				from 'core/reducers/book/new';

import lookedUpBooks		from 'core/reducers/book/looked-up';

import notifications		from 'core/reducers/notifications';


import dashboard			from 'app/reducers/dashboard';



export default combineReducers({
	authentication,
	dashboard,
	
	newUser,
	users,
	
	newClient,
	clients,
	
	newBook,
	books,
	
	lookedUpBooks,
	
	notifications
});