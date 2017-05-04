import React from "react";
import { API_URL, CLIENT_ID, REDIRECT_URI } from "config.json";

class Login extends React.Component {
	componentDidMount() {
		window.location =
			API_URL +
			"/oauth2/authorize?client_id=" +
			CLIENT_ID +
			"&response_type=code&redirect_uri=" +
			REDIRECT_URI;
	}

	render() {
		return null;
	}
}
export default Login;
