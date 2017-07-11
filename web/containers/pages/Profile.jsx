import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MdUpdate from "react-icons/md/update";

import { API_URL, CLIENT_ID, REDIRECT_URI } from "config.json";
import { COLOR_SUCCESS, COLOR_FAILURE, COLOR_INFO } from "core/constants/color";

import { updateUser, putUser } from "core/actions/user";
import { fetchAuthUser, updateAuthUser } from "core/actions/auth";
import { postImage } from "core/actions/image";

import { fetchOfferIfNeeded } from "core/actions/offer";
import { fetchBookIfNeeded } from "core/actions/book";

import { addNotification } from "core/actions/notification";

import "./Profile.scss";

import Loader from "halogen/RingLoader";

import Button from "web/components/ui/elements/Button";

import { getParameterByName } from "core/utilities/location";

class Profile extends React.Component {
	constructor(props) {
		super(props);

		let offerId = getParameterByName("offerId", window.location.href),
			offerRequestId = getParameterByName(
				"offerRequestId",
				window.location.href
			);

		this.state = {
			loading: false,
			highlightedOffer: offerId ? offerId : null,
			highlightedOfferRequest: offerRequestId ? offerRequestId : null
		};

		if (offerId) {
			setTimeout(() => {
				this.setState({
					highlightedOffer: null
				});
			}, 5000);
		}
		if (offerRequestId) {
			setTimeout(() => {
				this.setState({
					highlightedOfferRequest: null
				});
			}, 5000);
		}
	}

	componentDidMount = () => {
		this.props.dispatch(fetchAuthUser(this.props.accessToken));
		this.loadNeededInformation();
	};

	loadNeededInformation = () => {
		const { dispatch, user, accessToken } = this.props;

		if (user.offers) {
			user.offers.forEach(offer => {
				dispatch(fetchBookIfNeeded({ id: offer.bookId }), accessToken);
			});
		}

		if (user.offerRequests) {
			user.offerRequests.forEach(offerRequest => {
				dispatch(
					fetchOfferIfNeeded({ id: offerRequest.offerId }, accessToken)
				).then(offer => {
					dispatch(fetchBookIfNeeded({ id: offer.bookId }), accessToken);
				});
			});
		}
	};

	onFieldChange = key => {
		return event => {
			let user = Object.assign({}, this.props.user);

			user[key] = event.currentTarget.value;

			this.props.dispatch(updateUser(user));
			this.props.dispatch(updateAuthUser(user));
		};
	};

	onUpdateUser = () => {
		this.setState({
			loading: true
		});

		this.props
			.dispatch(putUser(this.props.user, this.props.accessToken))
			.then(() => {
				this.props.dispatch(
					addNotification({
						title: "Gespeichert",
						text: "Die Daten wurden erfolgreich gespeichert",
						hideDelay: 2500,
						color: COLOR_SUCCESS
					})
				);

				this.setState({
					loading: false
				});

				this.loadNeededInformation();
			});
	};

	onUploadProfilePicture = event => {
		const file = event.currentTarget.files[0]; //only read first

		if (file && file.type.startsWith("image/") && file.size < 1024 * 1024 * 2) {
			let formData = new FormData();
			formData.append("image", file);

			this.props
				.dispatch(postImage(formData, this.props.accessToken))
				.then(image => {
					let user = Object.assign({}, this.props.user);
					user.profilePictureId = image.id;

					this.props.dispatch(putUser(user, this.props.accessToken));
				});
		} else {
			this.props.dispatch(
				addNotification({
					title: "Datei ungültig!",
					text: "Wähle ein Bild, dass kleiner als 2 Megabyte ist!",
					color: COLOR_FAILURE,
					actions: []
				})
			);
		}
	};

	render() {
		const { dispatch, user, accessToken, books, offers } = this.props;
		const { highlightedOffer, highlightedOfferRequest } = this.state;

		let thumbnail = user.thumbnails.filter(thumbnail => {
			return thumbnail.name == "profile-picture-large";
		})[0];

		thumbnail = thumbnail
			? API_URL + thumbnail.url
			: "https://www.gravatar.com/avatar/?d=mm&s=200";

		return (
			<div className="container">
				<header styleName="header">
					<div styleName="profile-picture">
						<img src={thumbnail} />
						<div styleName="overlay">
							<input type="file" onChange={this.onUploadProfilePicture} />
							<MdUpdate />
						</div>
					</div>
					<h1>
						{user.nameDisplay.substring(0, 15)}'s Profil
					</h1>
				</header>

				<div className="row">
					<div className="col-12 col-lg-6">
						<h2 styleName="title">Name</h2>
						<div className="row">
							<div className="col-12">
								<div className="form-group">
									<input
										placeholder="Anzeigename"
										value={user.nameDisplay ? user.nameDisplay : ""}
										onChange={this.onFieldChange("nameDisplay")}
										type="text"
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12 col-md-6">
								<div className="form-group">
									<input
										placeholder="Vorname"
										value={user.nameFirst ? user.nameFirst : ""}
										onChange={this.onFieldChange("nameFirst")}
										type="text"
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12 col-md-6">
								<div className="form-group">
									<input
										placeholder="Nachname"
										value={user.nameLast ? user.nameLast : ""}
										onChange={this.onFieldChange("nameLast")}
										type="text"
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12 col-md-6">
								<div className="form-group">
									<button
										onClick={this.onUpdateUser}
										className="btn btn-primary"
									>
										Speichern
									</button>
									{this.state.loading
										? <Loader color="#FFC676" size="25px" />
										: null}
								</div>
							</div>
						</div>
						<h2 styleName="title">E-Mail und Passwort</h2>
						<div className="row">
							<div className="col-12 col-md-6">
								<div className="form-group">
									<input
										placeholder="E-Mail Adresse"
										type="text"
										className="form-control"
									/>
								</div>
							</div>
							<div className="col-12 col-md-6">
								<button className="btn btn-primary">E-Mail ändern</button>
							</div>
							<div className="col-12">
								<button className="btn btn-primary">
									Passwort zurücksetzen
								</button>
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-6">
						<h2 styleName="title">Offene Kaufanfragen</h2>
						<table styleName="table">
							<thead>
								<tr>
									<th>Buchtitel</th>
									<th>Datum der Anfrage</th>
									<th>Preis</th>
								</tr>
							</thead>
							<tbody>
								{user.offerRequests &&
									user.offerRequests
										.filter(offerRequest => {
											return !offerRequest.responded;
										})
										.map(offerRequest => {
											const offer = offers.filter(offer => {
												return offer.id == offerRequest.offerId;
											})[0];

											if (!offer) {
												return null;
											}

											const book = books.filter(book => {
												return book.id == offer.bookId;
											})[0];

											return book
												? <tr
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
														styleName={
															highlightedOfferRequest &&
															highlightedOfferRequest == offerRequest.id
																? "highlighted"
																: ""
														}
													>
														<td>
															<Link to={"/book/" + book.id}>
																{book.title}
															</Link>
														</td>
														<td>
															{new Date(
																offerRequest.createdAt
															).toLocaleDateString()}
														</td>
														<td>
															{offer.price + " Fr."}
														</td>
													</tr>
												: null;
										})}
							</tbody>
						</table>
						<h2 styleName="title">Offene Angebote</h2>
						<table styleName="table">
							<thead>
								<tr>
									<th>Buchtitel</th>
									<th>Erstelldatum</th>
									<th>Preis</th>
								</tr>
							</thead>
							<tbody>
								{user.offers &&
									user.offers
										.filter(offer => {
											return !offer.sold;
										})
										.map(offer => {
											const book = books.filter(book => {
												return book.id == offer.bookId;
											})[0];

											return book
												? <tr
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
														<td>
															<Link to={"/book/" + book.id}>
																{book.title}
															</Link>
														</td>
														<td>
															{new Date(offer.createdAt).toLocaleDateString()}
														</td>
														<td>
															{offer.price + " Fr."}
														</td>
													</tr>
												: null;
										})}
							</tbody>
						</table>
						<h2 styleName="title">Gekaufte Bücher</h2>
						<table styleName="table">
							<thead>
								<tr>
									<th>Buchtitel</th>
									<th>Kaufdatum</th>
									<th>Preis</th>
								</tr>
							</thead>
							<tbody>
								{user.offerRequests &&
									user.offerRequests
										.filter(offerRequest => {
											return offerRequest.responded;
										})
										.map(offerRequest => {
											const offer = offers.filter(offer => {
												return offer.id == offerRequest.offerId;
											})[0];

											if (!offer) {
												return null;
											}

											const book = books.filter(book => {
												return book.id == offer.bookId;
											})[0];

											return book
												? <tr key={offerRequest.id}>
														<td>
															<Link to={"/book/" + book.id}>
																{book.title}
															</Link>
														</td>
														<td>
															{new Date(
																offerRequest.updatedAt
															).toLocaleDateString()}
														</td>
														<td>
															{offer.price + " Fr."}
														</td>
													</tr>
												: null;
										})}
							</tbody>
						</table>
						<h2 styleName="title">Verkaufte Bücher</h2>
						<table styleName="table">
							<thead>
								<tr>
									<th>Buchtitel</th>
									<th>Erstelldatum</th>
									<th>Preis</th>
								</tr>
							</thead>
							<tbody>
								{user.offers &&
									user.offers
										.filter(offer => {
											return offer.sold;
										})
										.map(offer => {
											const book = books.filter(book => {
												return book.id == offer.bookId;
											})[0];

											return book
												? <tr key={offer.id}>
														<td>
															<Link to={"/book/" + book.id}>
																{book.title}
															</Link>
														</td>
														<td>
															{new Date(offer.createdAt).toLocaleDateString()}
														</td>
														<td>
															{offer.price + " Fr."}
														</td>
													</tr>
												: null;
										})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.app.authentication.user,
		accessToken: state.app.authentication.accessToken.token,
		offers: state.app.offers,
		books: state.app.books
	};
};

export default connect(mapStateToProps)(Profile);
