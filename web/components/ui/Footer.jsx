import React from "react";
import { Link } from "react-router-dom";
import FaGithub from "react-icons/fa/github";
import FaFacebook from "react-icons/fa/facebook";
import FaQuestionCircle from "react-icons/fa/question-circle";
import FaBug from "react-icons/fa/bug";
import FaMedkit from "react-icons/fa/medkit";
import FaBank from "react-icons/fa/bank";
import FaEnvelope from "react-icons/fa/envelope";

import CSSModules from "react-css-modules";
import styles from "./Footer.scss";

import Logo from "web/components/ui/elements/Logo";

const date = new Date(),
	year = date.getFullYear();

const Footer = ({ children, dispatch }) => {
	return (
		<footer styleName="footer">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-md-4">
						<Logo color="#fff" />
					</div>
					<div className="col-xs-12 col-md-4">
						<ul styleName="links">
							<li>
								<Link to="/bug">
									<FaBug /><span styleName="spacer" />Fehler gefunden?
								</Link>
							</li>
							<li>
								<Link to="/gtc">
									<FaBank /><span styleName="spacer" />AGB und
									Datenschutzbestimmungen
								</Link>
							</li>
							<li>
								<Link to="/faq">
									<FaQuestionCircle /><span styleName="spacer" />FAQ
								</Link>
							</li>
							<li>
								<a href="#facebook">
									<FaFacebook /><span styleName="spacer" />Folge uns auf
									Facebook
								</a>
							</li>
						</ul>
					</div>
					<div className="col-xs-12 col-md-4">
						<ul styleName="links">
							<li>
								<Link to="/faq">
									<FaEnvelope /><span styleName="spacer" />Kontakt
								</Link>
							</li>
							<li>
								<Link to="/faq">
									<FaGithub /><span styleName="spacer" />Quellcode
								</Link>
							</li>
							<li>
								<a href="#">
									<FaMedkit /><span styleName="spacer" />Möchtest du uns helfen?
								</a>
							</li>
						</ul>
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
