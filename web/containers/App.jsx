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

import Login             from 'web/components/auth/Login';
import OAuthCallback     from 'web/components/auth/OAuthCallback';

import Dashboard         from 'web/containers/content/dashboard/Dashboard';

import Wrapper           from 'web/containers/layout/Wrapper';

import UserRouter        from 'web/containers/content/user/UserRouter';
import ClientRouter      from 'web/containers/content/client/ClientRouter';
import PersonRouter      from 'web/containers/content/person/PersonRouter';
import ConditionRouter   from 'web/containers/content/condition/ConditionRouter';
import BookRouter        from 'web/containers/content/book/BookRouter';
import ThumbnailTypeRouter from 'web/containers/content/thumbnail-type/ThumbnailTypeRouter';
import ImageRouter       from 'web/containers/content/image/ImageRouter';
import OfferRouter       from 'web/containers/content/offer/OfferRouter';


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
			authentication  : state.app.authentication,
			//notifications   : state.app.notifications //functions can't be stored
		}
	});

}, 1000));

const App = () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/auth/callback' component={OAuthCallback} />

          <Wrapper>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/user' component={UserRouter} />
            <Route path='/client' component={ClientRouter}/>
            <Route path='/person' component={PersonRouter}/>
            <Route path='/condition' component={ConditionRouter}/>
            <Route path='/book' component={BookRouter}/>
            <Route path='/thumbnail-type' component={ThumbnailTypeRouter} />
            <Route path='/image' component={ImageRouter} />
            <Route path='/offer' component={OfferRouter} />
          </Wrapper>
        </div>
			</ConnectedRouter>
		</Provider>
	);
};

export default App;
