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

import UserOffers from "web/components/ui/UserOffers.jsx";
import Loader from "halogen/RingLoader";
import Button from "web/components/ui/elements/Button";

import { getParameterByName } from "core/utilities/location";

import MdSettings from "react-icons/md/settings";

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
			editingNames: false,
			editingEmail: false,
			newEmail: "",
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
		this.props.dispatch(fetchAuthUser(this.props.accessToken)).then(() => {
			this.loadNeededInformation();
		});
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
					loading: false,
					editingNames: false,
					editingEmail: false
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
					text: "Wähle ein Bild, das kleiner als 2 Megabyte ist!",
					color: COLOR_FAILURE,
					actions: []
				})
			);
		}
	};

	render() {
		const { dispatch, user, accessToken, books, offers } = this.props;

		let thumbnail = user.thumbnails.filter(thumbnail => {
			return thumbnail.name == "profile-picture-large";
		})[0];

		thumbnail = thumbnail
			? API_URL + thumbnail.url
			: "https://www.gravatar.com/avatar/?d=mm&s=200";

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-lg-4">
						<div styleName="card">
							<div styleName="profile-picture">
								<img width="200" height="200" src={thumbnail} />
								<div styleName="overlay">
									<input type="file" onChange={this.onUploadProfilePicture} />
									<MdUpdate />
								</div>
							</div>
							<div styleName="section">
								<div className="row">
									<div className="col-12">
										{!this.state.editingNames &&
											<h3>
												{(user.nameFirst ? user.nameFirst + " " : "") +
													(user.nameLast ? user.nameLast : "")}
												<MdSettings
													styleName="editable"
													onClick={() => {
														this.setState({ editingNames: true });
													}}
												/>
											</h3>}
										{this.state.editingNames &&
											<div className="form-group">
												<input
													placeholder="Vorname"
													value={user.nameFirst ? user.nameFirst : ""}
													onChange={this.onFieldChange("nameFirst")}
													type="text"
													className="form-control"
												/>
											</div>}
										{this.state.editingNames &&
											<div className="form-group">
												<input
													placeholder="Nachname"
													value={user.nameLast ? user.nameLast : ""}
													onChange={this.onFieldChange("nameLast")}
													type="text"
													className="form-control"
												/>
											</div>}
									</div>
									<div className="col-12 col-md-6">
										{!this.state.editingNames &&
											<h3>
												({user.nameDisplay})
												<MdSettings
													styleName="editable"
													onClick={() => {
														this.setState({ editingNames: true });
													}}
												/>
											</h3>}
										{this.state.editingNames &&
											<div className="form-group">
												<input
													placeholder="Anzeigename"
													value={user.nameDisplay ? user.nameDisplay : ""}
													onChange={this.onFieldChange("nameDisplay")}
													type="text"
													className="form-control"
												/>
											</div>}
									</div>
								</div>
								<div>
									<button
										onClick={this.onUpdateUser}
										className="btn btn-primary"
										disabled={!this.state.editingNames}
									>
										{this.state.loading
											? <Loader color="#FFFFFF" size="25px" />
											: null}
										Änderungen Speichern
									</button>
								</div>
							</div>
							<div styleName="section">
								<h3>E-Mail & Passwort</h3>
								<div className="row">
									<div className="col-12">
										<div className="form-group">
											{!this.state.editingEmail &&
												<h6>
													{user.emailVerified}
													<MdSettings
														styleName="editable"
														onClick={() => {
															this.setState({ editingEmail: true });
														}}
													/>
												</h6>}
											{this.state.editingEmail &&
												<input
													placeholder="E-Mail Adresse"
													type="text"
													className="form-control"
													onChange={e => {
														this.setState({ newEmail: e.currentTarget.value });
													}}
												/>}
										</div>
									</div>
									{this.state.editingEmail &&
										<div className="col-12">
											<button
												className="btn btn-primary"
												onClick={() => {
													dispatch(
														putUser(
															{ id: user.id, newEmail: this.state.newEmail },
															accessToken
														)
													).then(() => {
														window.open(
															API_URL +
																"/views/verify-email?email=" +
																this.state.newEmail
														);
														this.setState({ editingEmail: false });
													});
												}}
											>
												E-Mail ändern
											</button>
										</div>}
								</div>
							</div>
							<div styleName="section">
								<div className="row">
									<div className="col-12">
										<button
											className="btn btn-primary"
											onClick={() => {
												dispatch(
													putUser(
														{ id: user.id, newPassword: true },
														accessToken
													)
												).then(() => {
													window.open(
														API_URL +
															"/views/password-reset?email=" +
															user.emailVerified
													);
												});
											}}
										>
											Passwort zurücksetzen
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 col-lg-8">
						<UserOffers
							offerRequests={user.offerRequests}
							offers={user.offers}
							books={books}
							highlightedOffer={this.state.highlightedOffer}
							highlightedOfferRequest={this.state.highlightedOfferRequest}
						/>
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
