import React from "react";
import { connect } from "react-redux";
import { action as toggleMenu } from "redux-burger-menu";
import { Link } from "react-router-dom";
import { API_URL, CLIENT_ID, REDIRECT_URI } from "config.json";
import MdMenu from "react-icons/md/menu";

import "./Header.scss";

import Logo from "web/components/ui/elements/Logo";
import Button from "web/components/ui/elements/Button";
import NavMenu from "web/components/ui/navigation/NavMenu";

import Menu from "web/containers/ui/navigation/Burger";
import Searchbar from "web/containers/ui/Searchbar";

const Header = ({
	children,
	dispatch,
	user,
	searchbarToggled,
	accessToken
}) => {
	return (
		<div>
			<Menu right pageWrapId="page-wrap" outerContainerId="outer-container">
				<NavMenu user={user} />
			</Menu>
			<header styleName="header-wrapper">
				<div styleName="header" className="container">
					{!searchbarToggled &&
						<Link to="/">
							<div styleName="logo">
								<Logo />
							</div>
						</Link>}
					<div styleName="beta" className="hidden-sm-down">
						<Button>Beta</Button>
					</div>
					<Searchbar />
					<div
						styleName="burger-button"
						className="hidden-lg-up"
						onClick={() => {
							dispatch(toggleMenu(true));
						}}
					>
						<MdMenu />
					</div>
					<nav styleName="nav" className="hidden-md-down">
						<NavMenu user={user} />
					</nav>
				</div>
			</header>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.app.authentication.user,
		accessToken: state.app.authentication.accessToken.token,
		searchbarToggled: state.app.searchBar.toggled
	};
};

export default connect(mapStateToProps)(Header);
