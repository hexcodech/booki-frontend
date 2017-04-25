import React
       from 'react';
import ReactDOM
       from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose}
       from 'redux';
import {ConnectedRouter, routerReducer, routerMiddleware}
       from 'react-router-redux';
import {AppContainer}
       from 'react-hot-loader';
import createHistory
       from 'history/createBrowserHistory'
import App
       from 'web/containers/App';
import appReducer
       from 'app/reducers/app';
import thunkMiddleware
       from 'redux-thunk';
import throttle
       from 'lodash/throttle';
import {loadState, saveState}
      from 'core/utilities/local-storage';
import {reducer as burgerMenuReducer}
      from 'redux-burger-menu';

import DevTools
       from 'web/containers/dev/DevTools';

const presistedState = loadState();
const history        = createHistory();

const store = createStore(
	combineReducers({
		app             : appReducer,
		router          : routerReducer,
    burgerMenu      : burgerMenuReducer
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
			authentication: state.app.authentication
		}
	});

}, 1000));

ReactDOM.render(
	<AppContainer>
		<App history={history} store={store} />
	</AppContainer>,
	document.getElementById('root')
);

if(module.hot){
	module.hot.accept('web/containers/App', () => {

		const NextApp = require('web/containers/App').default;

    ReactDOM.render(
      <AppContainer>
        <NextApp history={history} store={store} />
      </AppContainer>,
      document.getElementById('root')
    );
	})
}
