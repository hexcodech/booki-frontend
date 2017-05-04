import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { WithContext as ReactTags } from "react-tag-input";

import InputMask from "react-input-mask";
import Dropzone from "react-dropzone";

import merge from "lodash/merge";

import { API_URL } from "config.json";

import { lookUpBooks } from "core/actions/book";
import { nextStep } from "app/actions/pages/sell";

import Modal from "web/components/ui/containers/Modal";
import SellStep from "web/containers/pages/SellStep";

import CSSModules from "react-css-modules";
import styles from "./Sell.scss";

class Sell extends React.Component {
	constructor() {
		super();

		this.state = {
			isbn: "",
			book: {
				title: "",
				subtitle: "",
				publisher: "",
				authors: [],
				pageCount: 0,
				publicationDate: ""
			},
			nextEnabled: false,
			loading: false,
			fading: []
		};
	}

	componentDidMount() {
		let { accessToken, dispatch } = this.props;

		if (!accessToken) {
			dispatch(push("/login"));
		}
	}

	onChangeIsbn = event => {
		if (event.currentTarget.value) {
			let isbn = event.currentTarget.value.replace(/[^[0-9]/g, "");

			if (isbn.length === 13) {
				this.setState({
					isbn: isbn,
					nextEnabled: true
				});
			} else {
				this.setState({
					isbn: isbn,
					nextEnabled: false
				});
			}
		}
	};

	onIsbnNextStep = () => {
		this.setState({
			loading: true,
			nextEnabled: false
		});

		const { dispatch, accessToken } = this.props;
		const { isbn } = this.state;

		dispatch(lookUpBooks(isbn, "local", accessToken))
			.then(books => {
				if (books.length > 0) {
					//cool
					return books;
				} else {
					return lookUpBooks(isbn, "external", accessToken);
				}
			})
			.then(books => {
				let book = {};
				if (books.length > 0) {
					if (books.length === 1) {
						book = books[0];
					} else {
						book = merge(...books);
					}
				}

				this.setState({
					book: book
				});

				this.toNextStep(0);
			});
	};

	toNextStep = indexFrom => {
		this.setState({
			nextEnabled: false,
			loading: false,
			fading: [...this.state.fading, indexFrom]
		});

		setTimeout(() => {
			this.setState({
				nextEnabled: false,
				loading: false,
				fading: this.state.fading.filter(index => {
					return index !== indexFrom;
				})
			});

			this.props.dispatch(nextStep());
		}, 1000);
	};

	authorDelete = tag => {
		let book = this.state.book;

		// mutate array
		book.authors.splice(currPos, 1);
		book.authors.splice(newPos, 0, tag);

		// re-render
		this.setState({ book: book });
	};

	authorAddition = author => {
		let book = this.state.book;

		book.authors.push(author);

		this.setState({ book: book });
	};

	authorDrag = (tag, currPos, newPos) => {
		let book = this.state.book;

		// mutate array
		book.authors.splice(currPos, 1);
		book.authors.splice(newPos, 0, tag);

		// re-render
		this.setState({ book: book });
	};

	onDrop = () => {};

	render() {
		let { nextEnabled, loading } = this.state;
		let { sell: { step, isbn } } = this.props;

		return (
			<div styleName="sell">
				<Modal fading={this.state.fading}>

					{step <= 0 &&
						<SellStep
							step={step}
							nextEnabled={nextEnabled}
							loading={loading}
							onNextStep={this.onIsbnNextStep}
						>

							<small styleName="description">
								Um dein Buch möglichst schnell zu finden, gib im unteren Suchfeld
								seine ISBN ein. Wir versuchen dann, so viel wie möglich über dein
								Buch herauszufinden.
							</small>

							<div styleName="isbn-input" className="form-group">
								<InputMask
									className="form-control"
									mask="\979–9–999–99999–9"
									maskChar="_"
									alwaysShowMask={true}
									onChange={this.onChangeIsbn}
									value={this.state.isbn}
								/>

								<small className="form-text">
									Wo finde ich die ISBN?
								</small>
							</div>

						</SellStep>}

					{step <= 1 &&
						<SellStep
							step={step}
							nextEnabled={nextEnabled}
							loading={loading}
							onNextStep={null}
						>

							<div styleName="form" className="row">
								<div className="col-4">
									<div styleName="image">
										{this.state.book && this.state.book.thumbnails
											? <img
													src={
														API_URL +
															this.state.book.thumbnails.filter(thumbnail => {
																return thumbnail.name === "book-cover-medium";
															})[0].url
													}
												/>
											: <Dropzone
													className="dropzone"
													activeClassName="dropzone-active"
													rejectClassName="dropzone-reject"
													onDrop={this.onDrop}
													preventDropOnDocument={true}
													maxSize={1024 * 1024 * 2}
													multiple={false}
													accept="image/*"
												>
													<div className="center">Lade ein Bild hoch</div>
												</Dropzone>}
									</div>
								</div>
								<div className="col-8">
									<div className="form-group">
										<input
											placeholder="Titel"
											value={this.state.book.title ? this.state.book.title : ""}
											className="form-control"
										/>
									</div>
									<div className="form-group">
										<input
											placeholder="Untertitel"
											value={
												this.state.book.subtitle ? this.state.book.subtitle : ""
											}
											className="form-control"
										/>
									</div>
									<div className="form-group">
										<ReactTags
											tags={
												this.state.book && this.state.book.authors
													? this.state.book.authors.map((author, index) => {
															return { id: index, text: author };
														})
													: []
											}
											placeholder="Füge einen neuen Autor hinzu"
											suggestions={[]}
											handleDelete={this.authorDelete}
											handleAddition={this.authorAddition}
											handleDrag={this.authorDrag}
											classNames={{
												tags: "tags-tags",
												tagInput: "tags-input",
												tagInputField: "form-control tags-input-field",
												selected: "tags-selected",
												tag: "tags-tag",
												remove: "tags-remove",
												suggestions: "tags-suggestions"
											}}
										/>
									</div>
									<div className="form-group">
										<input
											placeholder="Verlag"
											value={
												this.state.book.publisher
													? this.state.book.publisher
													: ""
											}
											className="form-control"
										/>
									</div>
									<div className="row">
										<div className="col-6">
											<div className="form-group">
												<input
													placeholder="Seitenzahl"
													value={
														this.state.book.pageCount
															? this.state.book.pageCount
															: 0
													}
													className="form-control"
												/>
											</div>
										</div>
										<div className="col-6">
											<div className="form-group">
												<InputMask
													placeholder="Datum"
													mask="99. 99. 9999"
													maskChar="_"
													value={
														this.state.publicationDate
															? this.state.publicationDate
															: ""
													}
													className="form-control"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

						</SellStep>}

				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		lookedUpBooks: state.app.lookedUpBooks,
		accessToken: state.app.authentication.accessToken.token,
		sell: state.app.pages.sell
	};
};

export default connect(mapStateToProps)(CSSModules(Sell, styles));
