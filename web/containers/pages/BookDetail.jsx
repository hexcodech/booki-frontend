import React from "react";
import { connect } from "react-redux";

import Book from "web/components/ui/elements/Book";
import { API_URL } from "config.json";

import { fetchBookIfNeeded } from "core/actions/book";

import CSSModules from "react-css-modules";
import styles from "./BookDetail.scss";

import Loader from "halogen/RingLoader";

class BookDetail extends React.Component {
	componentDidMount = () => {
		//Search for local suggestions
		const { dispatch, accessToken } = this.props;

		dispatch(
			fetchBookIfNeeded({ id: this.props.match.params.bookId }, accessToken)
		);
	};

	render() {
		const { dispatch, accessToken, books, match } = this.props;
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

		return (
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
										<td>{book.publicationDate}</td>
									</tr>}
							</tbody>
						</table>
					</div>
				</div>
				<div styleName="offers">
					<h1>Angebote</h1>

				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		accessToken: state.app.authentication.accessToken.token,
		books: state.app.books
	};
};

export default connect(mapStateToProps)(CSSModules(BookDetail, styles));
