import React from "react";
import { connect } from "react-redux";

import { push } from "react-router-redux";

import Book from "web/components/ui/elements/Book";
import { API_URL } from "config.json";

import { lookUpBooks } from "core/actions/book";

import CSSModules from "react-css-modules";
import styles from "./Search.scss";

import Loader from "halogen/RingLoader";

class Search extends React.Component {
	componentDidMount = () => {
		//Search for local suggestions
		this.props.dispatch(lookUpBooks(this.props.match.params.search, "local"));
	};

	render() {
		let { dispatch, accessToken, books, match } = this.props;

		let combined = [...books.local, ...books.external];
		const search = match.params.search;

		return (
			<div styleName="search" className="container">
				<h1>Suchresultate für "{search}"</h1>
				{combined.length === 0
					? <div styleName="loader">
							<Loader color="#FFC676" size="75px" />
						</div>
					: <div className="row">
							{combined.map(book => {
								return (
									<div
										key={book.isbn13}
										className="col-12 col-sm-12 col-md-6 col-lg-4"
									>
										<div styleName="book">
											<div className="row">
												<div className="col-4">
													<Book
														width={200}
														height={245}
														id={book.id}
														url={
															API_URL +
																book.thumbnails.filter(thumbnail => {
																	return thumbnail.name === "book-cover-medium";
																})[0].url
														}
													/>
												</div>
												<div className="col-8">
													<div styleName="title">
														<h3>{book.title}</h3>
													</div>
													<div styleName="authors">
														von
														{" "}
														{book.authors.reduce(
															(list, author, index, authors) => {
																return index === authors.length - 1
																	? list + " und " + author
																	: list + ", " + author;
															}
														)}
													</div>
													<div styleName="offers">
														{book.offers.reverse().map(offer => {
															let thumbnail = offer.user.thumbnails.map(
																thumbnail => {
																	return (
																		thumbnail.name === "profile-picture-small"
																	);
																}
															)[0];

															thumbnail = thumbnail
																? thumbnail.src
																: "https://www.gravatar.com/avatar/?d=mm&s=50";

															return (
																<div
																	key={offer.id + Math.random()}
																	styleName="profile-picture"
																>
																	<img src={thumbnail} />
																</div>
															);
														})}
														<span styleName="offer-counter">
															{book.offers.length}
															{" "}
															Angebote ab
															{" "}
															<span styleName="price">10.00 Fr.</span>
														</span>
													</div>
												</div>
												<div className="col-12">
													<button
														styleName="detail-button"
														className="btn btn-primary"
														onClick={() => {
															dispatch(push("/book/" + book.id));
														}}
													>
														Mehr Infos
													</button>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		accessToken: state.app.authentication.accessToken.token,
		books: state.app.lookedUpBooks
	};
};

export default connect(mapStateToProps)(CSSModules(Search, styles));
