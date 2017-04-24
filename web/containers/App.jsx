import React
       from 'react';
import {Provider}
       from 'react-redux';

import {Route}
       from 'react-router-dom';
import {ConnectedRouter}
       from 'react-router-redux';

//Containers
import OAuthCallback     from 'web/components/auth/OAuthCallback';
import Wrapper           from 'web/containers/ui/Wrapper';

const App = ({store, history}) => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
        <div>
          <Route path='/auth/callback' component={OAuthCallback} />

          <Wrapper />
        </div>
			</ConnectedRouter>
		</Provider>
	);
};

export default App;
