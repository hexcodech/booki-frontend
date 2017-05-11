import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { WithContext as ReactTags } from "react-tag-input";
import fuzzy from "fuzzy";

import InputMask from "react-input-mask";
import Dropzone from "react-dropzone";

import merge from "lodash/merge";
import set from "lodash/set";

import { LANGUAGES } from "core/constants/select-options";
import { API_URL } from "config.json";

import { putBook, postBook, lookUpBooks } from "core/actions/book";
import { postOffer } from "core/actions/offer";
import { lookUpPeople } from "core/actions/person";
import {
	nextStep,
	gotoStep,
	updateIsbn,
	updateBook,
	updateImage,
	updateOffer,
	setNextEnabled,
	setLoading,
	addFading,
	removeFading,
	resetSell
} from "app/actions/pages/sell";
import { putImage, postImage, deleteImage } from "core/actions/image";
import { fetchConditionsIfNeeded } from "core/actions/condition";

import Modal from "web/components/ui/containers/Modal";
import SellStep from "web/containers/pages/SellStep";

import CSSModules from "react-css-modules";
import styles from "./Sell.scss";

const conditionTranslations = {
	GOOD: "gut"
};

const fuzzySearch = (query, suggestions) => {
	return fuzzy.filter(query, suggestions).map(function(item) {
		return item.string;
	});
};

class Sell extends React.Component {
	componentDidMount = () => {
		let { accessToken, dispatch } = this.props;

		if (!accessToken) {
			dispatch(push("/login"));
		} else {
			dispatch(fetchConditionsIfNeeded());
		}
	};

	toNextStep = (nextEnabled = false) => {
		const { dispatch } = this.props;

		dispatch(setNextEnabled(false));
		dispatch(setLoading(false));
		dispatch(addFading(0));

		setTimeout(() => {
			dispatch(setNextEnabled(nextEnabled));
			dispatch(removeFading(0));
			dispatch(nextStep());
		}, 1000);
	};

	onChangeIsbn = event => {
		const { dispatch } = this.props;

		if (event.currentTarget.value) {
			let isbn = event.currentTarget.value.replace(/[^[0-9]/g, "");

			dispatch(updateIsbn(isbn));

			if (isbn.length === 13) {
				dispatch(setNextEnabled(true));
			} else {
				dispatch(setNextEnabled(false));
			}
		}
	};

	onIsbnNextStep = () => {
		const { dispatch, accessToken } = this.props;
		const { isbn } = this.props.sell;

		dispatch(setNextEnabled(false));
		dispatch(setLoading(true));

		dispatch(lookUpBooks(isbn, "local", accessToken))
			.then(books => {
				if (books.length > 0) {
					//cool
					return books;
				} else {
					return dispatch(lookUpBooks(isbn, "external", accessToken));
				}
			})
			.then(books => {
				let book = this.props.sell.book;

				if (books.length > 0) {
					if (books.length === 1) {
						book = books[0];
					} else {
						book = merge(...books);
					}
				}

				dispatch(updateBook(book));
				this.toNextStep(book && book.verified ? book.verified : false);
			});
	};

	authorInput = author => {
		const { dispatch, accessToken } = this.props;

		if (author) {
			dispatch(lookUpPeople(author, accessToken));
		}
	};

	authorDelete = tag => {
		let { book } = this.props.sell;

		// mutate array
		book.authors.splice(currPos, 1);
		book.authors.splice(newPos, 0, tag);

		// re-render
		this.props.dispatch(updateBook(book));
	};

	authorAddition = author => {
		let book = this.props.sell.book;

		book.authors.push(author);

		this.props.dispatch(updateBook(book));
	};

	authorDrag = (tag, currPos, newPos) => {
		let book = this.props.sell.book;

		// mutate array
		book.authors.splice(currPos, 1);
		book.authors.splice(newPos, 0, tag);

		// re-render
		this.props.dispatch(updateBook(book));
	};

	onDrop = (acceptedFiles, rejectedFiles) => {
		const { dispatch, accessToken } = this.props;

		let formData = new FormData();
		formData.append("image", acceptedFiles[0]);

		let promise;

		if (this.props.sell.image.id && this.props.sell.image.id != 0) {
			promise = dispatch(
				putImage(this.props.sell.image.id, formData, accessToken)
			);
		} else {
			promise = dispatch(postImage(formData, accessToken));
		}

		promise.then(image => {
			dispatch(updateImage(image));

			let book = {
				...this.props.sell.book,
				coverId: image.id
			};

			dispatch(updateBook(book));

			this.validateBook(book, image);
		});
	};

	onBookChange = key => {
		return event => {
			let book = { ...this.props.sell.book }, image = this.props.sell.image;
			book[key] = event.currentTarget.value;

			this.props.dispatch(updateBook(book));
			this.validateBook(book, image);
		};
	};

	validateBook = (book, image) => {
		if (
			book.title.length > 0 &&
			book.authors.length > 0 &&
			(!isNaN(book.pageCount) && book.pageCount > 0) &&
			((book.coverId && book.coverId != 0) || (image.id && image.id != 0)) &&
			book.language &&
			book.language.length >= 2
		) {
			this.props.dispatch(setNextEnabled(true));
		} else {
			this.props.dispatch(setNextEnabled(false));
		}
	};

	onSubmitBook = () => {
		const { dispatch, accessToken } = this.props;
		let { isbn, image, book } = this.props.sell;

		dispatch(setLoading(true));
		dispatch(setNextEnabled(false));

		if (this.props.sell.book.verified) {
			//everything's okey
			this.toNextStep();
		} else {
			book.isbn13 = isbn;
			book.coverId = image.id;

			let promise;

			//post/put the new book
			if (this.props.sell.book.id) {
				//put
				promise = dispatch(putBook(book, accessToken));
			} else {
				//post
				promise = dispatch(postBook(book, accessToken));
			}

			promise.then(book => {
				dispatch(updateBook(book));
				this.toNextStep();
			});
		}
	};

	onOfferChange = key => {
		return event => {
			let offer = {};
			offer[key] = event.currentTarget.value;

			this.props.dispatch(updateOffer(offer));
			this.validateOffer(offer);
		};
	};

	validateOffer = offer => {
		if (
			offer.conditionId &&
			offer.conditionId != 0 &&
			(!isNaN(offer.price) && offer.price > 0) &&
			this.props.sell.book.id
		) {
			this.props.dispatch(setNextEnabled(true));
		} else {
			this.props.dispatch(setNextEnabled(false));
		}
	};

	onSubmitOffer = () => {
		const { dispatch, accessToken } = this.props;
		let { offer } = this.props.sell;

		dispatch(setLoading(true));
		dispatch(setNextEnabled(false));

		offer.bookId = this.props.sell.book.id;

		dispatch(postOffer(offer, accessToken)).then(offer => {
			dispatch(resetSell());

			dispatch(push("/"));
		});
	};

	render() {
		let { nextEnabled, loading } = this.props.sell;
		let { sell: { step, isbn }, conditions } = this.props;
		let inputsDisabled = this.props.sell.book.verified;

		let thumbnails = this.props.sell.book.thumbnails.length > 0
			? this.props.sell.book.thumbnails
			: this.props.sell.image.thumbnails,
			thumbnail = thumbnails.filter(thumbnail => {
				return thumbnail.name === "book-cover-medium";
			})[0];

		let condition = conditions.filter(condition => {
			return condition.id == this.props.sell.offer.conditionId;
		})[0];

		return (
			<div styleName="sell">
				<Modal fading={this.props.sell.fading}>

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
									value={this.props.sell.isbn}
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
							onNextStep={this.onSubmitBook}
						>

							<div styleName="form" className="row">
								<div className="col-4">
									<div styleName="image">
										{thumbnail
											? <img src={API_URL + thumbnail.url} />
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
											value={
												this.props.sell.book.title
													? this.props.sell.book.title
													: ""
											}
											className="form-control"
											onChange={this.onBookChange("title")}
											disabled={inputsDisabled}
										/>
									</div>
									<div className="form-group">
										<input
											placeholder="Untertitel"
											value={
												this.props.sell.book.subtitle
													? this.props.sell.book.subtitle
													: ""
											}
											className="form-control"
											onChange={this.onBookChange("subtitle")}
											disabled={inputsDisabled}
										/>
									</div>
									<div className="form-group">
										<ReactTags
											tags={
												this.props.sell.book && this.props.sell.book.authors
													? this.props.sell.book.authors.map(
															(author, index) => {
																return { id: index, text: author };
															}
														)
													: []
											}
											placeholder="Füge einen neuen Autor hinzu"
											suggestions={this.props.lookedUpPeople} //suggestions
											handleFilterSuggestions={fuzzySearch}
											handleInputChange={this.authorInput}
											handleDelete={inputsDisabled ? null : this.authorDelete}
											handleAddition={
												inputsDisabled ? null : this.authorAddition
											}
											handleDrag={inputsDisabled ? null : this.authorDrag}
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
												this.props.sell.book.publisher
													? this.props.sell.book.publisher
													: ""
											}
											className="form-control"
											onChange={this.onBookChange("publisher")}
											disabled={inputsDisabled}
										/>
									</div>
									<div className="row">
										<div className="col-6">
											<div className="form-group">
												<input
													placeholder="Seitenzahl"
													value={this.props.sell.book.pageCount}
													className="form-control"
													onChange={this.onBookChange("pageCount")}
													disabled={inputsDisabled}
												/>
											</div>
										</div>
										<div className="col-6">
											<div className="form-group">
												<select
													className="form-control"
													value={this.props.sell.book.language}
													onChange={this.onBookChange("language")}
												>
													<option key={0} value={null}>
														Wähle die Sprache des Buches
													</option>
													{LANGUAGES.map(language => {
														return (
															<option
																key={language.value}
																value={language.value}
															>
																{language.label}
															</option>
														);
													})}
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>

						</SellStep>}

					{step <= 2 &&
						<SellStep
							step={step}
							nextEnabled={nextEnabled}
							loading={loading}
							onNextStep={this.onSubmitOffer}
						>

							<div styleName="form" className="row">
								<div className="col-6">
									<div className="form-group">
										<select
											className="form-control"
											onChange={this.onOfferChange("conditionId")}
											value={this.props.sell.offer.conditionId}
										>
											<option key={0} value={0}>Wähle einen Zustand</option>
											{conditions.map(condition => {
												return (
													<option key={condition.id} value={condition.id}>
														{conditionTranslations[condition.key]}
													</option>
												);
											})}
										</select>
										{condition &&
											<small styleName="description">
												{condition.priceFactor * 100 + "% "}
												des Originalpreises wäre etwa ein fairer Preis.
											</small>}
									</div>
								</div>
								<div className="col-6">
									<div className="form-group">
										<input
											placeholder="Preis"
											type="number"
											className="form-control"
											value={this.props.sell.offer.price}
											onChange={this.onOfferChange("price")}
										/>
									</div>
								</div>
								<div className="col-12">
									<div className="form-group">
										<textarea
											placeholder="optionale Beschreibung"
											className="form-control"
											value={this.props.sell.offer.description}
											onChange={this.onOfferChange("description")}
											rows="5"
										/>
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
		lookedUpPeople: state.app.lookedUpPeople,
		conditions: state.app.conditions,
		accessToken: state.app.authentication.accessToken.token,
		sell: state.app.pages.sell
	};
};

export default connect(mapStateToProps)(CSSModules(Sell, styles));
