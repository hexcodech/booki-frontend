import React
       from 'react';
import {connect}
       from 'react-redux';
import {Link}
       from 'react-router-dom';
import {push}
       from 'react-router-redux';
import bindAll
       from 'lodash/bindAll';

import {invalidateOffers, fetchOffersIfNeeded}
       from 'core/actions/offer';

import Card
      from 'web/components/layout/Card';

import {Table}
       from 'web/components/layout/Table';

import Actions
       from 'web/components/layout/Actions';

import RefreshButton
       from 'web/components/RefreshButton';

class OfferList extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount',
			'handleRefreshClick',
			'handleOfferRowClick'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

		dispatch(fetchOffersIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidateOffers());
		dispatch(fetchOffersIfNeeded(accessToken));
	}

	handleOfferRowClick(e){
		this.props.dispatch(
			push(
				'/offer/' + e.currentTarget.getAttribute('data-offer-id') + '/'
			)
		);
	}

	render(){

		const {offers} = this.props;

		return (
			<div className='offer-list'>
        <Actions>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Refresh the offer list.'
          >
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Add a new offer.'
          >
						<Link to={'/offer/new/'}>
							<i className='material-icons'>add</i>
						</Link>
					</li>
				</Actions>

				<Card>
					<Table interactive={true}>
						<thead>
							<tr>
								<th>ID</th>
								<th>Price</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{offers.map((offer, index) => {

								return (
                  <tr key={index}
										onClick={this.handleOfferRowClick}
										data-offer-id={offer.id}
                  >
										<td>{offer.id}</td>
										<td>{offer.price} CHF</td>
										<td>{offer.description.substring(0, 50)}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Card>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		accessToken : state.app.authentication.accessToken.token,
		offers     : state.app.offers
	};
}

export default connect(mapStateToProps)(OfferList);
