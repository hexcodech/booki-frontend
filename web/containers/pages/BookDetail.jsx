import React from "react";
import { connect } from "react-redux";

import Book from "web/components/ui/elements/Book";
import { API_URL } from "config.json";

import { fetchBookIfNeeded } from "core/actions/book";
import {
	setOfferId,
	resetOfferId,
	updateMessage
} from "app/actions/pages/book-detail";

import CSSModules from "react-css-modules";
import styles from "./BookDetail.scss";

import Modal from "web/components/ui/containers/Modal";
import Loader from "halogen/RingLoader";

class BookDetail extends React.Component {
	componentDidMount = () => {
		//Search for local suggestions
		const { dispatch, accessToken } = this.props;

		dispatch(
			fetchBookIfNeeded({ id: this.props.match.params.bookId }, accessToken)
		);
	};

	onSendRequest = () => {};

	render() {
		const { dispatch, accessToken, books, match, bookDetail } = this.props;
		const bookId = match.params.bookId;

		let book = books.filter(book => {
			return book.id == bookId;
		})[0];

		if (!book || book.isFetching) {
			return (
				<div className="container">
					<Loader color="#FFC676" size="75px" />
				</div>
			);
		}

		let thumbnail = book.thumbnails.filter(thumbnail => {
			return thumbnail.name === "book-cover-medium";
		})[0];

		let offer = book.offers.filter(offer => {
			return offer.id == bookDetail.offerId;
		})[0];

		return (
			<div>
				{offer &&
					<Modal>
						<div styleName="modal">
							<h2>Anfrage schicken</h2>
							{offer.description &&
								<div styleName="description">
									<h4>Beschreibung</h4>
									<p>
										{offer.description}
									</p>
								</div>}
							<h4>Nachricht an {offer.user.nameDisplay}</h4>
							<textarea
								className="form-control"
								onChange={e => {
									dispatch(updateMessage(e.currentTarget.value));
								}}
								rows="6"
								placeholder="Könntest Du mir das Buch nach Hause senden? Meine Adresse ist..."
							/>
							<small>
								Hinweis: Mit "Senden" erhält der Verkäufer deine E-Mail Adresse und kann dich so direkt kontaktieren.
							</small>
							<button
								styleName="cancel"
								className="btn btn-primary"
								onClick={() => {
									dispatch(resetOfferId());
								}}
							>
								Abbrechen
							</button>
							<button
								styleName="send"
								className="btn btn-primary"
								onClick={this.onSendRequest}
							>
								Senden
							</button>
						</div>
					</Modal>}
				<div styleName="book" className="container">
					<div className="row">
						<div className="col-6 col-md-3">
							<Book
								width={200}
								height={245}
								id={book.id}
								url={thumbnail ? API_URL + thumbnail.url : 0}
							/>
						</div>
						<div className="col-12 col-md-9">
							<div styleName="title">
								<h1>{book.title}</h1>
								{book.subtitle ? <h2>{" - " + book.subtitle}</h2> : ""}
							</div>
							<div styleName="authors">
								von
								{" "}
								{book.authors.reduce((list, author, index, authors) => {
									return index === authors.length - 1
										? list + " und " + author
										: list + ", " + author;
								})}
							</div>
							<p styleName="description">
								{book.description}
							</p>
							<table styleName="meta">
								<tbody>
									<tr>
										<td>ISBN-13</td>
										<td>{book.isbn13}</td>
									</tr>
									{book.language &&
										<tr>
											<td>Sprache</td>
											<td>
												<img
													width="25"
													height="25"
													src={
														API_URL +
															"/static/res/img/locales/" +
															book.language +
															".svg"
													}
												/>
											</td>
										</tr>}
									{book.pageCount &&
										<tr>
											<td>Seiten</td>
											<td>{book.pageCount}</td>
										</tr>}
									{book.publisher &&
										<tr>
											<td>Verlag</td>
											<td>{book.publisher}</td>
										</tr>}
									{book.publicationDate &&
										<tr>
											<td>Veröffentlichungsdatum</td>
											<td>
												{new Date(book.publicationDate).toLocaleDateString()}
											</td>
										</tr>}
								</tbody>
							</table>
						</div>
					</div>
					<div styleName="offers">
						<h1>Angebote</h1>
						<div className="row">
							{book.offers.map(offer => {
								//TODO sort
								let thumbnail = offer.user.thumbnails.map(thumbnail => {
									return thumbnail.name === "profile-picture-medium";
								})[0];

								thumbnail = thumbnail
									? API_URL + thumbnail.src
									: "https://www.gravatar.com/avatar/?d=mm&s=100";

								return (
									<div key={offer.id} className="col-12 col-md-6 col-lg-4">
										<div styleName="offer">
											<div className="row">
												<div className="col-2 col-sm-2 col-md-3">
													<div styleName="profile-picture">
														<img src={thumbnail} />
													</div>
												</div>
												<div className="col-10 col-sm-10 col-md-9">
													<h4>{offer.user.nameDisplay}</h4>
													<p styleName="condition">
														Zustand: <span>{offer.condition.key} {" "}</span>
													</p>
													<p styleName="price">
														Preis:
														{" "}
														<span>
															{parseFloat(offer.price).toFixed(2) + " Fr."}
														</span>
													</p>
												</div>
												<div className="col-12">
													<button
														styleName="detail-button"
														className="btn btn-primary"
														onClick={() => {
															dispatch(setOfferId(offer.id));
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		accessToken: state.app.authentication.accessToken.token,
		books: state.app.books,
		bookDetail: state.app.pages.bookDetail
	};
};

export default connect(mapStateToProps)(CSSModules(BookDetail, styles));
