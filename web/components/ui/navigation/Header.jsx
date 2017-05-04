import React from "react";
import { connect } from "react-redux";
import { action as toggleMenu } from "redux-burger-menu";
import { Link } from "react-router-dom";
import { API_URL, CLIENT_ID, REDIRECT_URI } from "config.json";

import CSSModules from "react-css-modules";
import styles from "./Header.scss";

import Logo from "web/components/ui/elements/Logo";
import Menu from "web/components/ui/navigation/Burger";
import Button from "web/components/ui/elements/Button";

import Searchbar from "web/containers/ui/Searchbar";

const NavMenu = (
	<ul>
		<li>
			<Link to="/">Kaufen</Link>
		</li>
		<li>
			<Link to="/sell">Verkaufen</Link>
		</li>
		<li>
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
			</a>
		</li>
	</ul>
);

const Header = ({ children, dispatch }) => {
	return (
		<div>
			<Menu right pageWrapId="page-wrap" outerContainerId="outer-container">
				{NavMenu}
			</Menu>
			<header styleName="header-wrapper">
				<div styleName="header" className="container">
					<Link to="/">
						<div styleName="logo">
							<Logo />
						</div>
					</Link>
					<div styleName="beta" className="hidden-sm-down">
						<Button>
							Beta
						</Button>
					</div>
					<Searchbar />
					<div
						styleName="burger-button"
						className="hidden-lg-up"
						onClick={() => {
							dispatch(toggleMenu(true));
						}}
					>
						<i className="material-icons">menu</i>
					</div>
					<nav styleName="nav" className="hidden-md-down">
						{NavMenu}
					</nav>
				</div>
			</header>
		</div>
	);
};

export default connect()(CSSModules(Header, styles));
