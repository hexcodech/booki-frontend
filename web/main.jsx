import React														from 'react';
import ReactDOM														from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose}		from 'redux'
import {Provider}													from 'react-redux';
import {Router, Route, IndexRoute, browserHistory}					from 'react-router';
import {syncHistoryWithStore, routerReducer, routerMiddleware}		from 'react-router-redux';
import thunkMiddleware												from 'redux-thunk';
import throttle														from 'lodash/throttle';

import {loadState, saveState}										from 'core/utilities/local-storage';

//reducer(s)

import appReducer													from 'app/reducers/app';

//React Components

/*import Wrapper														from 'web/containers/layout/Wrapper';*/

//Dev

/*import DevTools														from 'web/containers/dev/DevTools';*/

//Components

import Index														from 'web/components/pages/Index';
/*import Login														from 'web/components/auth/Login';
import OAuthCallback												from 'web/components/auth/OAuthCallback';*/

//Containers

import Content														from 'web/containers/content/Content';
	/*import DashboardContent										from 'web/containers/content/dashboard/Dashboard';
	
	import UserList													from 'web/containers/content/user/UserList';
	import User														from 'web/containers/content/user/User';

	import ClientList												from 'web/containers/content/client/ClientList';
	import Client													from 'web/containers/content/client/Client';
	
	import BookList													from 'web/containers/content/book/BookList';
	import Book														from 'web/containers/content/book/Book';*/



const persistentState = loadState();

const store = createStore(
	combineReducers({
		app					: appReducer,
		routing				: routerReducer
	}),
	
	persistentState,
	
	compose(
		applyMiddleware(
			thunkMiddleware,
			routerMiddleware(browserHistory)
		),
		DevTools.instrument(),
	),
);

store.subscribe(throttle(() => {	
	const state = store.getState();
	
	saveState({
		routing: state.routing,
		app: {
			authentication	: state.app.authentication,
			notifications	: state.app.notifications
		}
	});
	
}, 1000));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		{ /* Tell the Router to use our enhanced history */ }

		<Router history={history}>
			<Route path='/'>
				<IndexRoute component={Index} />
				<Route path='auth/callback' component={OAuthCallback} />

				<Route component={Wrapper}>
					<Route path='dashboard/' component={Content} >
						<IndexRoute component={DashboardContent} />

						<Route path='users/' component={UserList} />
						<Route path='user/:userId/' component={User} />

						<Route path='clients/' component={ClientList} />
						<Route path='client/:clientId/' component={Client} />

						<Route path='books/' component={BookList} />
						<Route path='book/:bookId/' component={Book} />


					</Route>
				</Route>*/

			</Route>
		</Router>
	</Provider>,
	
	document.getElementById('root')
);