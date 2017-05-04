import React from "react";
import { Provider } from "react-redux";

import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

//Containers
import OAuthCallback from "web/components/auth/OAuthCallback";
import Wrapper from "web/components/ui/containers/Wrapper";

//Content
import Home from "web/components/pages/Home";
import Login from "web/components/pages/Login";
import Sell from "web/containers/pages/Sell";
import Search from "web/containers/pages/Search";

const App = ({ store, history }) => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div>
					<Wrapper>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />

						<Route path="/auth/callback" component={OAuthCallback} />

						<Route path="/search/:search" component={Search} />
						<Route path="/sell" component={Sell} />
					</Wrapper>
				</div>
			</ConnectedRouter>
		</Provider>
	);
};

export default App;
