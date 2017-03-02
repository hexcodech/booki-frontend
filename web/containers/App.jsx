import React														from 'react';
import {createStore, combineReducers, applyMiddleware, compose}		from 'redux';
import {Provider}													from 'react-redux';
import {BrowserRouter as Router, Route, Link}						from 'react-router-dom';
import {syncHistoryWithStore, routerReducer, routerMiddleware}		from 'react-router-redux';
import thunkMiddleware												from 'redux-thunk';
import throttle														from 'lodash/throttle';

import {loadState, saveState}										from 'core/utilities/local-storage';

//reducer(s)

import appReducer													from 'app/reducers/app';

//Components

import Wrapper														from 'web/containers/layout/Wrapper';

//Containers

import DevTools														from 'web/containers/dev/DevTools';

import Login														from 'web/components/auth/Login';
import OAuthCallback												from 'web/components/auth/OAuthCallback';

import Content														from 'web/containers/content/Content';
import Dashboard													from 'web/containers/content/dashboard/Dashboard';

import UserList														from 'web/containers/content/user/UserList';
import User															from 'web/containers/content/user/User';

import ClientList													from 'web/containers/content/client/ClientList';
import Client														from 'web/containers/content/client/Client';

import BookList														from 'web/containers/content/book/BookList';
import Book															from 'web/containers/content/book/Book';


const presistedState = loadState();

const store = createStore(
	combineReducers({
		app					: appReducer,
		//routing				: routerReducer
	}),
	
	presistedState,
	
	compose(
		applyMiddleware(
			thunkMiddleware,
			//routerMiddleware(browserHistory)
		),
		DevTools.instrument(),
	),
);

store.subscribe(throttle(() => {//storing some keys of the application state in the localstorage
	const state = store.getState();
	
	saveState({
		//routing: state.routing,
		app: {
			authentication	: state.app.authentication,
			notifications	: state.app.notifications
		}
	});
	
}, 1000));

//const history			= syncHistoryWithStore(browserHistory, store); //has to be after 'store' has been created

const App = () => {
	return (
		<Provider store={store}>	
			<Router>
				<div>
					<Route exact path='/' component={Login} />
					<Route path='/auth/callback' component={OAuthCallback} />
					<Route path='/dasboard' component={Dashboard} />
				</div>
			</Router>
		</Provider>
	);
};

export default App;