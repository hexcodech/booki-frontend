import { createStore, applyMiddleware } from 'redux';
import { loadUser } from 'redux-oidc';
import { syncTranslationWithStore, loadTranslations, setLocale } from 'react-redux-i18n';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import userManager from '../utils/userManager';

import en from '../i18n/en';

const createStoreWithMiddleware = applyMiddleware(
    thunk,
)(createStore);
export const store = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

loadUser(store, userManager);

syncTranslationWithStore(store);
store.dispatch(loadTranslations({en}));
store.dispatch(setLocale('en'));