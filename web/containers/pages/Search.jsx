import React from "react";
import { connect } from "react-redux";

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
					: <table>
							<tbody>
								{combined.map(book => {
									return (
										<tr
											key={book.isbn13}
											className="col-12 col-sm-2 col-md-3 col-lg-4"
										>
											<td>
												<div className="row">
													<div className="col-2">
														<img src={book.thumbnails.search} />
														image thingy image thingy image thingy image thingy
													</div>
													<div className="col-10">
														<h3>{book.title}</h3>
														{book.subtitle ? <h4>{book.subtitle}</h4> : ""}
														{book.isbn13}
														{book.language}
														{book.authors}
														{book.publisher}
														{book.publicationDate}
														{book.pageCount}
														{book.description}
													</div>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>}
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
