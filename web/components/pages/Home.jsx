import React from "react";

import Book from "web/components/ui/elements/Book";

import CSSModules from "react-css-modules";
import styles from "./Home.scss";

const Home = () => {
	return (
		<div styleName="home">
			<div styleName="slider-wrapper" className="hidden-sm-down">
				<div styleName="slider" className="container">
					<div styleName="book-slide" className="row">
						<div className="col-md-5 col-lg-4 col-xl-3">
							<Book />
						</div>
						<div className="col-md-7 col-lg-8 col-xl-9">
							<h1>Titel</h1>
							<p>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
								diam nonumy eirmod tempor invidunt ut labore et dolore magna
								aliquyam erat, sed diam voluptua. At vero eos et accusam et
								justo duo dolores et ea rebum. Stet clita kasd gubergren, no
								sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
								ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
								nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
								erat, sed diam voluptua. At vero eos et accusam et justo duo
								dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
								sanctus est Lorem ipsum dolor sit amet.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div styleName="book-list" className="container">
				<div className="row">
					{[1, 2, 3, 4, 5, 6].map(() => {
						return (
							<div className="col-2">
								<Book />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CSSModules(Home, styles);
