import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

import App from './App';
import Home from './routes/Home';

ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                {/*Most routes will be writen here*/}
            </Route>
        </Router>
    ),
  document.getElementById('root')
);
