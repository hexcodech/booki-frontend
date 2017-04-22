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

import {invalidateConditions, fetchConditionsIfNeeded}
       from 'core/actions/condition';

import Card
      from 'web/components/layout/Card';

import {Table}
       from 'web/components/layout/Table';

import Actions
       from 'web/components/layout/Actions';

import RefreshButton
       from 'web/components/RefreshButton';

class ConditionList extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount',
			'handleRefreshClick',
			'handleConditionRowClick'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

		dispatch(fetchConditionsIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidateConditions());
		dispatch(fetchConditionsIfNeeded(accessToken));
	}

	handleConditionRowClick(e){
		this.props.dispatch(
			push(
				'/condition/' + e.currentTarget.getAttribute('data-condition-id') + '/'
			)
		);
	}

	render(){

		const {conditions} = this.props;

		return (
			<div className='condition-list'>
        <Actions>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Refresh the condition list.'
          >
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Add a new condition.'
          >
						<Link to={'/condition/new/'}>
							<i className='material-icons'>add</i>
						</Link>
					</li>
				</Actions>

				<Card>
					<Table interactive={true}>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Price Factor</th>
							</tr>
						</thead>
						<tbody>
							{conditions.map((condition, index) => {

								return (
                  <tr key={index}
										onClick={this.handleConditionRowClick}
										data-condition-id={condition.id}
                  >
										<td>{condition.id}</td>
										<td>{condition.key}</td>
                    <td>{condition.priceFactor}</td>
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
		conditions  : state.app.conditions
	};
}

export default connect(mapStateToProps)(ConditionList);
