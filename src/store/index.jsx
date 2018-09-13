import { createStore, compose } from 'redux';
import { loadUser } from 'redux-oidc';
import reducers from '../reducers';
import userManager from '../utils/userManager';

const createStoreWithMiddleware = compose(
    
)(createStore);
export const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

loadUser(store, userManager);