import React from "react";
import { Link } from "react-router-dom";
import FaGithub from "react-icons/fa/github";
import FaFacebook from "react-icons/fa/facebook";
import FaQuestionCircle from "react-icons/fa/question-circle";
import FaBug from "react-icons/fa/bug";
import FaWrench from "react-icons/fa/wrench";
import FaMedkit from "react-icons/fa/medkit";
import FaBank from "react-icons/fa/bank";
import FaEnvelope from "react-icons/fa/envelope";

import "./Footer.scss";

import Logo from "web/components/ui/elements/Logo";

const date = new Date(),
	year = date.getFullYear();

const user = "olleh",
	domain = "hc.ikoob";

const sendMail = (subject = "", body = "", cc = "", bcc = "") => {
	return e => {
		e.preventDefault();
		e.stopPropagation();

		window.location =
			"mailto:" +
			user.split("").reverse().join("") +
			"@" +
			domain.split("").reverse().join("") +
			"?subject=" +
			subject +
			"&body=" +
			body +
			"&cc=" +
			cc +
			"&bcc=" +
			bcc;
	};
};

const Footer = ({ children, dispatch }) => {
	return (
		<footer styleName="footer">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-md-4">
						<Logo color="#fff" />
						<br />
						Made with
						<svg styleName="heart" viewBox="0 0 32 29.6">
							<path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
						</svg>
						by{" "}
						<a href="https://hexcode.ch" target="_blank">
							hexcode.ch
						</a>
					</div>
					<div className="col-xs-12 col-md-4">
						<ul styleName="links">
							<li>
								<a onClick={sendMail("Kontakt", "Heii Booki-Team\n")}>
									<FaEnvelope />
									<span styleName="spacer" />Kontakt
								</a>
							</li>
							<li>
								<Link to="/faq">
									<FaQuestionCircle />
									<span styleName="spacer" />FAQ
								</Link>
							</li>
							<li>
								<a href="https://m.facebook.com/officialbooki/" target="_blank">
									<FaFacebook />
									<span styleName="spacer" />Folge uns auf Facebook
								</a>
							</li>
							<li>
								<Link to="/gtc">
									<FaBank />
									<span styleName="spacer" />AGBs und Datenschutzbestimmungen
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-xs-12 col-md-4">
						<ul styleName="links">
							<li>
								<a
									href="https://github.com/hexcodech/booki-frontend"
									target="_blank"
								>
									<FaGithub />
									<span styleName="spacer" />Quellcode
								</a>
							</li>
							<li>
								<a
									href="https://docs.google.com/forms/d/e/1FAIpQLSeBBAuiXG8YBjxykonc0fztS8EXQOrYzQyLEvS-eDBcETwF-g/viewform"
									target="_blank"
								>
									<FaBug />
									<span styleName="spacer" />Fehler gefunden?
								</a>
							</li>
							<li>
								<Link to="/bug-tracker">
									<FaWrench />
									<span styleName="spacer" />Updateverlauf
								</Link>
							</li>
							<li>
								<a
									onClick={sendMail(
										"Hilfsangebot",
										"Heii Booki-Team\nIch bin x und wäre dazu bereit bei y mitzuhelfen."
									)}
								>
									<FaMedkit />
									<span styleName="spacer" />Möchtest du uns helfen?
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

export default Footer;
