import React from "react";

import CSSModules from "react-css-modules";
import styles from "./Footer.scss";

import Logo from "web/components/ui/elements/Logo";

const date = new Date(), year = date.getFullYear();

const Footer = ({ children, dispatch }) => {
	return (
		<footer styleName="footer">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-md-4">
						<Logo color="#fff" />
					</div>
					<div className="col-xs-12 col-md-4">
						Lorem
					</div>
					<div className="col-xs-12 col-md-4">
						Ipsum
					</div>
				</div>
				<div styleName="copyright" className="text-xs-center">
					© Copyright {year} by booki
				</div>
			</div>
		</footer>
	);
};

export default CSSModules(Footer, styles);
