import React
       from 'react';
import {Provider}
       from 'react-redux';

import {Route}
       from 'react-router-dom';
import {ConnectedRouter}
       from 'react-router-redux';

//Containers
import OAuthCallback
       from 'web/components/auth/OAuthCallback';
import Wrapper
       from 'web/containers/ui/Wrapper';

//Content
import Home
       from 'web/containers/content/Home';
import Sell
       from 'web/containers/content/Sell';
import Search
      from 'web/containers/content/Search';

const App = ({store, history}) => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
        <div>
          <Wrapper>
            <Route exact path='/' component={Home} />
            <Route path='/auth/callback' component={OAuthCallback} />

            <Route path='/search/:search' component={Search} />
            <Route path='/sell' component={Sell} />
          </Wrapper>
        </div>
			</ConnectedRouter>
		</Provider>
	);
};

export default App;
