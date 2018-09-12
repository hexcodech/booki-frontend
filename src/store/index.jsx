import { createStore, applyMiddleware, compose } from 'redux';
import createOidcMiddleware, { loadUser } from 'redux-oidc';
import reducers from '../reducers';
import userManager from '../utils/userManager';

const oidcMiddleware = createOidcMiddleware(userManager);

const createStoreWithMiddleware = compose(
    applyMiddleware(oidcMiddleware)
)(createStore);
export const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

//loadUser(store, userManager);