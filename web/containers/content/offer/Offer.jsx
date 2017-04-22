import React
       from 'react';
import {connect}
       from 'react-redux';
import {push}
       from 'react-router-redux';
import set
       from 'lodash/set';
import bindAll
       from 'lodash/bindAll';
import JSONTree
       from 'react-json-tree';

import {JSONTreeTheme, COLOR_SUCCESS, COLOR_FAILURE, COLOR_INFO}
       from 'core/constants/color';

import {
  invalidateOffers, clearNewOffer, updateNewOffer,
  fetchOffersIfNeeded, putOffer, postOffer, deleteOffer
}      from 'core/actions/offer';

import {fetchUsersIfNeeded}
       from 'core/actions/user';
import {fetchConditionsIfNeeded}
       from 'core/actions/condition';
import {fetchBooksIfNeeded}
       from 'core/actions/book';

import {addNotification}
       from 'core/actions/notification';

import {selectInput, textAreaInput}
      from 'web/utilities/input-types';

import RefreshButton
       from 'web/components/RefreshButton';
import Actions
       from 'web/components/layout/Actions';
import FormGroups
       from 'web/components/form/FormGroups';

import Card
       from 'web/components/layout/Card';

import ConditionOptionComponent
       from 'web/components/form/input/select/condition/ConditionOptionComponent';
import ConditionValueComponent
       from 'web/components/form/input/select/condition/ConditionValueComponent';

class Offer extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount', 	'handleRefreshClick', 	'handleOnChange',
			'handleOnAddNewOffer', 	'handleOnDeleteOffer'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

    dispatch(fetchUsersIfNeeded(accessToken));
    dispatch(fetchConditionsIfNeeded(accessToken));
    dispatch(fetchBooksIfNeeded(accessToken));
		dispatch(fetchOffersIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidateOffers());
		dispatch(fetchOffersIfNeeded(accessToken));
	}

	handleOnChange(id, value){
		const {
      dispatch, accessToken,
      newOffer, offers, match: {params: {id: offerId}}
    } = this.props;

		let offer;

		if(offerId == 'new'){

			offer = Object.assign({}, newOffer);

			if(set(offer, id, value)){
				dispatch(
					updateNewOffer(offer)
				);
			}

		}else{

			offer = Object.assign({}, offers.filter((offer) => {
				return offer.id == offerId;
			})[0]);

			if(set(offer, id, value)){
				dispatch(
					putOffer(offer, accessToken)
				);
			}

		}
	}

	handleOnAddNewOffer(e){
		e.preventDefault();
		e.stopPropagation();

		const {dispatch, accessToken, newOffer} = this.props;
		const offer = Object.assign({}, newOffer);

		dispatch(
			postOffer(offer, accessToken)
		).then((postedOffer) => {

			if(postedOffer){

				dispatch(
					addNotification({
						title		: 'Created',
						text		: 'The offer was successfully created.',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS,
					})
				);

				dispatch(
					push('/offer/' + postedOffer.id + '/')
				);

				dispatch(
					clearNewOffer()
				);

			}

		});
	}

	handleOnDeleteOffer(e){
		e.preventDefault();
		e.stopPropagation();

		const {
      dispatch, offers, accessToken, match: {params: {id: offerId}}
    } = this.props;

		let offer = Object.assign({}, offers.filter((offer) => {
			return offer.id == offerId;
		})[0]);

		dispatch(
			deleteOffer(offer, accessToken)
		).then((success) => {
			if(success){

				dispatch(
					addNotification({
						title		: 'Deleted',
						text		: 'The offer was successfully deleted',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS,

						actions		: [{
							text: 'Undo',
							color: COLOR_INFO,
							action: (e, notification) => {

								dispatch(
									postOffer(offer, accessToken)
								).then((postedOffer) => {

									if(postedOffer){
										dispatch(
											push('/offer/' + postedOffer.id + '/')
										);
									}

									notification.hide();

								});

							}
						}]
					})
				);

				dispatch(
					push('/offer/list')
				);
			}
		});
	}

	render(){

		const {
      newOffer, offers, match: {params: {id: offerId}}, users,
      books, conditions, dispatch, errors
    } = this.props;

		let offer;

		if(offerId == 'new'){

			offer = newOffer;

		}else{

			offer = offers.filter((offer) => {
				return offer.id == offerId;
			})[0];

		}

		if(!offer){return null;}

		return (
			<div className='offer'>

				<Actions>
					{offerId !== 'new' &&
						<li>
              <RefreshButton
                date={offer.lastUpdated}
                loading={offer.isFetching}
                refreshHandler={this.handleRefreshClick}
              />
						</li>
					}
					{offerId == 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Create offer'
            >
							<a href='#' onClick={this.handleOnAddNewOffer}>
								<i className='material-icons'>add_circle</i>
							</a>
						</li>
					}
					{offerId !== 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Delete offer'
            >
							<a href='#' onClick={this.handleOnDeleteOffer}>
								<i className='material-icons'>delete</i>
							</a>
						</li>
					}
				</Actions>

				<Card>
					<h2>Offer form</h2>

					<form className='profile'>
            <FormGroups
							object={offer}

              errors={errors.offer}

							keyPaths={[
								[
                {
                  keyPath       : 'id',
                  label         : 'Offer Id',
                  inputDisabled : true
                },
                {
                  keyPath       : 'conditionId',
                  label         : 'Condition',
                  inputType: selectInput({
										searchPromptText: 'Searching for conditions...',
										valueComponent: ConditionValueComponent,
										optionComponent: ConditionOptionComponent,
										options: conditions.map((condition) => {
                      return {
                        ...condition,
                        value: condition.id,
                        label: condition.key
                      };
                    }),
										value: offer.conditionId,
									}, null, (offer) => {return offer && offer.id ? offer.id : ''})
                },
								],
								[
                {
                  keyPath       : 'price',
                  label         : 'Price',
                  inputType     : 'number',
                  inputProps    : {
                    min  : 0,
                    step : 'any'
                  }
                },
                {
                  keyPath       : 'description',
                  label         : 'Description',
                  inputType     : textAreaInput()
                }
								],
								[
                {
                  keyPath       : 'userId',
                  label         : 'User Id',
                  inputType     : selectInput({
										searchPromptText: 'Searching for users...',
                    options: users.map((user) => {
                      return {
                        ...user,
                        value: user.id,
                        label: user.nameDisplay + ' (' + ([
                                  user.nameTitle,
                                  user.nameFirst,
                                  user.nameMiddle,
                                  user.nameLast
                        ]).join(' ').trim() + ')'
                      };
                    }),
										value: offer.userId,
                  }, null, (user) => {return user && user.id ? user.id : ''})
                },
                {
                  keyPath       : 'bookId',
                  label         : 'Book Id',
                  inputType     : selectInput({
										searchPromptText: 'Searching for books...',
                    options: books.map((book) => {
                      return {
                        ...book,
                        value: book.id,
                        label: book.title + ' (' + book.pageCount + ')'
                      };
                    }),
										value: offer.userId,
                  }, null, (user) => {return user && user.id ? user.id : ''})
                },
								]
							]}
							handleOnChange={this.handleOnChange}
            />

					</form>
				</Card>

        <Card>
					<h2>Raw JSON</h2>
          <JSONTree
						data={offer}
						theme={JSONTreeTheme}
						invertTheme={false}
						hideRoot={true}
						//sortObjectKeys={true}
          />
				</Card>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		accessToken : state.app.authentication.accessToken.token,
		newOffer    : state.app.newOffer,
    conditions  : state.app.conditions,
		offers      : state.app.offers,
		users       : state.app.users,
    books       : state.app.books,
    errors      : state.app.validation
	};
}

export default connect(mapStateToProps)(Offer);
