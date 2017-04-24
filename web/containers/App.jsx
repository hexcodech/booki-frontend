import React
       from 'react';
import {createStore, combineReducers, applyMiddleware, compose}
       from 'redux';
import {Provider}
       from 'react-redux';

import {Route}
       from 'react-router-dom';
import createHistory
       from 'history/createBrowserHistory'
import {ConnectedRouter, routerReducer, routerMiddleware}
       from 'react-router-redux';

import thunkMiddleware
       from 'redux-thunk';
import throttle
       from 'lodash/throttle';

import {loadState, saveState}
      from 'core/utilities/local-storage';

//reducer(s)

import appReducer        from 'app/reducers/app';

//Containers

import DevTools          from 'web/containers/dev/DevTools';

import OAuthCallback     from 'web/components/auth/OAuthCallback';

import Wrapper           from 'web/containers/layout/Wrapper';


const presistedState = loadState();
const history        = createHistory();

const store = createStore(
	combineReducers({
		app             : appReducer,
		router          : routerReducer
	}),

	presistedState,

	compose(
		applyMiddleware(
			thunkMiddleware,
			routerMiddleware(history)
		),
		DevTools.instrument(),
	),
);

//storing some keys of the application state in the localstorage
store.subscribe(throttle(() => {
	const state = store.getState();

	saveState({
		router: state.router,
		app: {
			authentication  : state.app.authentication
		}
	});

}, 1000));

const App = () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
        <div>
          <Route path='/auth/callback' component={OAuthCallback} />

          <Wrapper>
          </Wrapper>
        </div>
			</ConnectedRouter>
		</Provider>
	);
};

export default App;
