import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "config.json";
import "./UserOffers.scss";

import { fetchAuthUser } from "core/actions/auth";
import { deleteOffer, putOffer } from "core/actions/offer";

const UserOffers = ({
	dispatch,
	accessToken,
	offerRequests,
	offers,
	books,
	highlightedOfferRequest,
	highlightedOffer
}) => {
	const openOffers = offers.filter(offer => {
			return !offer.sold;
		}),
		soldOffers = offers.filter(offer => {
			return offer.sold;
		}),
		openOfferRequests = offerRequests.filter(offerRequest => {
			return !offerRequest.responded;
		}),
		closedOfferRequests = offerRequests.filter(offerRequest => {
			return offerRequest.responded;
		});
	return (
		<div>
			{openOfferRequests &&
				openOfferRequests.length > 0 &&
				<div styleName="card-offers">
					<h2>Offene Kaufanfragen</h2>
					{openOfferRequests.map(offerRequest => {
						const offer = offers.filter(offer => {
							return offer.id == offerRequest.offerId;
						})[0];

						if (!offer) {
							return null;
						}

						const book = books.filter(book => {
							return book.id == offer.bookId;
						})[0];

						const thumbnail =
							book && book.thumbnails
								? book.thumbnails.filter(thumbnail => {
										return thumbnail.name === "book-cover-medium";
									})[0]
								: null;

						return book
							? <div
									key={offerRequest.id}
									ref={el => {
										if (
											el &&
											highlightedOfferRequest &&
											highlightedOfferRequest == offerRequest.id
										) {
											setTimeout(() => {
												el.scrollIntoView();
											}, 0);
										}
									}}
									className="row"
									styleName={
										highlightedOfferRequest &&
										highlightedOfferRequest == offerRequest.id
											? "highlighted"
											: ""
									}
								>
									<div className="col-6 col-sm-3 col-lg-2">
										<img
											width="400"
											height="490"
											styleName="book-thumbnail"
											src={thumbnail ? API_URL + thumbnail.url : ""}
										/>
									</div>
									<div className="col-12 col-sm-9 col-lg-10">
										<Link to={"/book/" + book.id}>
											<h5>
												{book.title}
											</h5>
										</Link>
										<div>
											{book.authors && book.authors.join(", ")}
										</div>
										<div>
											Am
											{" " +
												new Date(offerRequest.createdAt).toLocaleDateString() +
												" Anfrage für "}
											<em styleName="price">
												{offer.price}
												{" Fr."}
											</em>
											{" gesendet"}
										</div>
									</div>
								</div>
							: null;
					})}
				</div>}
			{openOffers &&
				openOffers.length > 0 &&
				<div styleName="card-offers">
					<h2>Offene Angebote</h2>
					{openOffers.map(offer => {
						const book = books.filter(book => {
							return book.id == offer.bookId;
						})[0];

						const thumbnail =
							book && book.thumbnails
								? book.thumbnails.filter(thumbnail => {
										return thumbnail.name === "book-cover-medium";
									})[0]
								: null;

						return book
							? <div
									className="row"
									key={offer.id}
									ref={el => {
										if (
											el &&
											highlightedOffer &&
											highlightedOffer == offer.id
										) {
											setTimeout(() => {
												el.scrollIntoView();
											}, 0);
										}
									}}
									styleName={
										highlightedOffer && highlightedOffer == offer.id
											? "highlighted"
											: ""
									}
								>
									<div className="col-6 col-sm-3 col-lg-2">
										<img
											width="400"
											height="490"
											styleName="book-thumbnail"
											src={thumbnail ? API_URL + thumbnail.url : ""}
										/>
									</div>
									<div className="col-12 col-sm-5 col-lg-6 col-xl-7">
										<Link to={"/book/" + book.id}>
											<h5>
												{book.title}
											</h5>
										</Link>
										<div>
											{book.authors && book.authors.join(", ")}
										</div>
										<div>
											Am
											{" " +
												new Date(offer.createdAt).toLocaleDateString() +
												" Angebot für "}
											<em styleName="price">
												{offer.price}
												{" Fr."}
											</em>
											{" erstellt"}
										</div>
									</div>
									<div
										className="col-12 col-sm-4 col-lg-4 col-xl-3"
										styleName="actions"
									>
										<button
											className="btn btn-primary"
											onClick={() => {
												dispatch(deleteOffer(offer, accessToken)).then(() => {
													dispatch(fetchAuthUser(accessToken));
												});
											}}
										>
											Angebot löschen
										</button>
									</div>
								</div>
							: null;
					})}
				</div>}
			{closedOfferRequests &&
				closedOfferRequests.length > 0 &&
				<div styleName="card-offers">
					<h2>Gekaufte Bücher</h2>
					{closedOfferRequests.map(offerRequest => {
						const offer = offers.filter(offer => {
							return offer.id == offerRequest.offerId;
						})[0];

						if (!offer) {
							return null;
						}

						const book = books.filter(book => {
							return book.id == offer.bookId;
						})[0];

						const thumbnail =
							book && book.thumbnails
								? book.thumbnails.filter(thumbnail => {
										return thumbnail.name === "book-cover-medium";
									})[0]
								: null;

						return book
							? <div key={offerRequest.id} className="row">
									<div className="col-6 col-sm-3 col-lg-2">
										<img
											width="400"
											height="490"
											styleName="book-thumbnail"
											src={thumbnail ? API_URL + thumbnail.url : ""}
										/>
									</div>
									<div className="col-12 col-sm-9 col-lg-10">
										<Link to={"/book/" + book.id}>
											<h5>
												{book.title}
											</h5>
										</Link>
										<div>
											{book.authors && book.authors.join(", ")}
										</div>
										<div>
											Am
											{" " +
												new Date(offerRequest.updatedAt).toLocaleDateString() +
												" für "}
											<em styleName="price">
												{offer.price}
												{" Fr."}
											</em>
											{" gekauft"}
										</div>
									</div>
								</div>
							: null;
					})}
				</div>}
			{soldOffers &&
				soldOffers.length > 0 &&
				<div styleName="card-offers">
					<h2>Verkaufte Bücher</h2>
					{soldOffers.map(offer => {
						const book = books.filter(book => {
							return book.id == offer.bookId;
						})[0];

						const thumbnail =
							book && book.thumbnails
								? book.thumbnails.filter(thumbnail => {
										return thumbnail.name === "book-cover-medium";
									})[0]
								: null;

						return book
							? <div key={offer.id} className="row">
									<div className="col-6 col-sm-3 col-lg-2">
										<img
											width="400"
											height="490"
											styleName="book-thumbnail"
											src={thumbnail ? API_URL + thumbnail.url : ""}
										/>
									</div>
									<div className="col-12 col-sm-5 col-lg-6 col-xl-7">
										<Link to={"/book/" + book.id}>
											<h5>
												{book.title}
											</h5>
										</Link>
										<div>
											{book.authors && book.authors.join(", ")}
										</div>
										<div>
											Am
											{" " +
												new Date(offer.updatedAt).toLocaleDateString() +
												" für "}
											<em styleName="price">
												{offer.price}
												{" Fr."}
											</em>
											{" verkauft"}
										</div>
									</div>
									<div
										className="col-12 col-sm-4 col-lg-4 col-xl-3"
										styleName="actions"
									>
										<button
											className="btn btn-primary"
											onClick={() => {
												dispatch(
													putOffer({ ...offer, sold: false }, accessToken)
												).then(() => {
													dispatch(fetchAuthUser(accessToken));
												});
											}}
										>
											Angebot reaktivieren
										</button>
									</div>
								</div>
							: null;
					})}
				</div>}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		accessToken: state.app.authentication.accessToken.token
	};
};

export default connect(mapStateToProps)(UserOffers);
