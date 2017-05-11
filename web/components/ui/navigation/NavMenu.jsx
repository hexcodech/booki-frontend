import React from "react";
import { Link } from "react-router-dom";

import { API_URL, CLIENT_ID, REDIRECT_URI } from "config.json";

import CSSModules from "react-css-modules";
import styles from "./NavMenu.scss";

const NavMenu = ({ user = false }) => {
	let thumbnail = user.thumbnails.filter(thumbnail => {
		return thumbnail.name == "profile-picture-small";
	})[0];

	thumbnail = thumbnail
		? API_URL + thumbnail.url
		: "https://www.gravatar.com/avatar/?d=mm&s=50";

	return (
		<ul>
			<li>
				<Link to="/">Kaufen</Link>
			</li>
			<li>
				<Link to="/sell">Verkaufen</Link>
			</li>
			<li>
				{!user.id &&
					<a
						href={
							API_URL +
								"/oauth2/authorize?client_id=" +
								CLIENT_ID +
								"&response_type=code&redirect_uri=" +
								REDIRECT_URI
						}
					>
						Login
					</a>}
				{user.id &&
					<Link to="/profile">
						<div styleName="profile">
							<div styleName="profile-picture">
								<img src={thumbnail} />
							</div>
							<div styleName="name">
								{user.nameDisplay.substring(0, 15)}
							</div>
						</div>
					</Link>}
			</li>
		</ul>
	);
};

export default CSSModules(NavMenu, styles);
