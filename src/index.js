import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import { store } from './store/index';
import userManager from './utils/userManager';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Provider store={store}>
        <OidcProvider store={store} userManager={userManager}>
            <App />
        </OidcProvider>
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
