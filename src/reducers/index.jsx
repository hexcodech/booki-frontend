import { combineReducers } from 'redux';
import { reducer as oidcReducer } from 'redux-oidc';
import { i18nReducer } from 'react-redux-i18n';

const reducer = combineReducers(
  {
    oidc: oidcReducer,
    i18n: i18nReducer,
  }
);

export default reducer;