import React from "react";

import Book from "web/components/ui/elements/Book";

import CSSModules from "react-css-modules";
import styles from "./Home.scss";

import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div styleName="home">
			<div styleName="slider-wrapper" className="hidden-sm-down">
				<div styleName="slider" className="container">
					<div styleName="book-slide" className="row">
						<div className="col-md-5">
							<h2>
								Hallo!
								<br />
								Auf booki kannst du deine alten Bücher einfach verkaufen.
							</h2>

							<Link styleName="about" to={"/about"}>So funktioniert es</Link>
						</div>
						<div styleName="slider-books" className="col-md-2">
							<img src="/img/book01.png" />
						</div>
						<div styleName="slider-books" className="col-md-2">
							<img src="/img/book02.png" />
						</div>
						<div styleName="slider-books" className="col-md-3">
							<img src="/img/book03.png" />
						</div>
					</div>
				</div>
			</div>
			<div styleName="book-list" className="container">
				<h1>Aktuelle Angebote</h1>

				<div className="row">
					{[1, 2, 3, 4, 5, 6].map((num, index) => {
						return (
							<div key={index} className="col-2">
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
