import React from "react";
import { connect } from "react-redux";
import { API_URL, CLIENT_ID, REDIRECT_URI } from "config.json";

import CSSModules from "react-css-modules";
import styles from "./Profile.scss";

import Button from "web/components/ui/elements/Button";

const Profile = ({ dispatch, user, accessToken }) => {
	let thumbnail = user.thumbnails.filter(thumbnail => {
		return thumbnail.name == "profile-picture-big";
	})[0];

	thumbnail = thumbnail
		? API_URL + thumbnail.src
		: "https://www.gravatar.com/avatar/?d=mm&s=200";

	return (
		<div className="container">
			<header styleName="header">
				<img src={thumbnail} />
				<h1>{user.nameDisplay}'s Profil</h1>
			</header>

			<div className="row">
				<div className="col-12 col-lg-6">
					<h2>Settings</h2>
				</div>
				<div className="col-12 col-lg-6">
					<h2>Open requests</h2>
					<h2>Open offers</h2>
					<h2>Sold books</h2>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.app.authentication.user,
		accessToken: state.app.authentication.accessToken.token
	};
};

export default connect(mapStateToProps)(CSSModules(Profile, styles));
