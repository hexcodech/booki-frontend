import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link } from "react-router-dom";
import { action as toggleMenu } from "redux-burger-menu";
import FaCaretDown from "react-icons/fa/caret-down";

import { logoutUser } from "core/actions/auth";

import { API_URL, CLIENT_ID, REDIRECT_URI } from "config.json";

import "./NavMenu.scss";

class NavMenu extends React.Component {
	constructor() {
		super();
		this.state = { userDropdown: false };
	}

	render = () => {
		const { dispatch, isOpen, user = false } = this.props;

		let thumbnail = user.thumbnails
				? user.thumbnails.filter(thumbnail => {
						return thumbnail.name == "profile-picture-medium";
					})[0]
				: "",
			smallThumbnail = user.thumbnails
				? user.thumbnails.filter(thumbnail => {
						return thumbnail.name == "profile-picture-small";
					})[0]
				: "";

		thumbnail = thumbnail
			? API_URL + thumbnail.url
			: "https://www.gravatar.com/avatar/?d=mm&s=100";

		smallThumbnail = smallThumbnail
			? API_URL + smallThumbnail.url
			: "https://www.gravatar.com/avatar/?d=mm&s=50";

		return (
			<ul
				styleName="nav-menu"
				onClick={() => {
					if (isOpen) {
						dispatch(toggleMenu(false));
					}
				}}
			>
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
						<div>
							<div className="hidden-lg-up" styleName="profile-mobile">
								<div styleName="profile-picture-mobile">
									<img src={smallThumbnail} />
								</div>
								<Link
									to="/profile"
									onClick={() => {
										this.setState({
											userDropdown: false
										});
									}}
								>
									{user.nameDisplay.substring(0, 15)}
								</Link>
							</div>
							<a
								className="hidden-md-down"
								styleName="profile"
								href="#"
								onClick={() => {
									this.setState({ userDropdown: !this.state.userDropdown });
								}}
							>
								{user.nameDisplay.substring(0, 15)}
							</a>
						</div>}
					{user.id &&
						this.state.userDropdown &&
						<div styleName="dropdown" className="hidden-md-down">
							<div styleName="profile-picture">
								<img src={thumbnail} />
							</div>
							<div styleName="name">
								{user.nameDisplay}
							</div>
							<Link
								className="btn btn-primary"
								to="/profile"
								onClick={() => {
									this.setState({
										userDropdown: false
									});
								}}
							>
								Mein Profil
							</Link>
							<a
								className="btn btn-primary"
								href="#"
								onClick={() => {
									this.setState({
										userDropdown: false
									});

									dispatch(logoutUser());
									dispatch(push("/"));
								}}
							>
								Logout
							</a>
						</div>}
				</li>
				{user.id &&
					<li className="hidden-lg-up">
						<a
							href="#"
							onClick={() => {
								dispatch(logoutUser());
								dispatch(push("/"));
							}}
						>
							Logout
						</a>
					</li>}
			</ul>
		);
	};
}

const mapStateToProps = state => {
	return {
		isOpen: state.burgerMenu.isOpen
	};
};

export default connect(mapStateToProps)(NavMenu);
