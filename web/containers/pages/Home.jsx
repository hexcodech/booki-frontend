import React from "react";
import { connect } from "react-redux";

import { API_URL } from "config.json";

import { fetchLatestBookOffersIfNeeded } from "core/actions/book";

import Book from "web/components/ui/elements/Book";

import "./Home.scss";

import { Link } from "react-router-dom";

class Home extends React.Component {
	componentDidMount = () => {
		this.props.dispatch(fetchLatestBookOffersIfNeeded());
	};

	render() {
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

				<div styleName="beta-wrapper" className="hidden-sm-down">
					<div styleName="slider" className="container">
						<div styleName="card" className="col-md-5">
							<h2>
								Achtung Baustelle!
							</h2>

							Booki ist noch in der Beta-Phase. Du kannst uns helfen, die Plattform zu testen und zu verbessern.

							<br/>
							<Link styleName="about" to={"/about"}>So kannst du helfen</Link>
					</div>
				</div>
				</div>

				<div styleName="book-list" className="container">
					<h1>Aktuelle Angebote</h1>

					<div className="row">
						{this.props.latestBookOffers.map((book, index) => {
							return (
								<div
									key={book.id}
									styleName="book"
									className="col-6 col-md-4 col-lg-2"
								>
									<Link to={"/book/" + book.id}>
										<Book
											id={book.id}
											url={
												API_URL +
												book.thumbnails.filter(thumbnail => {
													return thumbnail.name === "book-cover-medium";
												})[0].url
											}
										/>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		accessToken: state.app.authentication.accessToken.token,
		latestBookOffers: state.app.latestBookOffers
	};
};

export default connect(mapStateToProps)(Home);
