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

import {invalidatePeople, fetchPeopleIfNeeded}
       from 'core/actions/person';

import Card
      from 'web/components/layout/Card';

import {Table}
       from 'web/components/layout/Table';

import Actions
       from 'web/components/layout/Actions';

import RefreshButton
       from 'web/components/RefreshButton';

class PersonList extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount',
			'handleRefreshClick',
			'handlePersonRowClick'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

		dispatch(fetchPeopleIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidatePeople());
		dispatch(fetchPeopleIfNeeded(accessToken));
	}

	handlePersonRowClick(e){
		this.props.dispatch(
			push(
				'/person/' + e.currentTarget.getAttribute('data-person-id') + '/'
			)
		);
	}

	render(){

		const {people} = this.props;

		return (
			<div className='person-list'>
        <Actions>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Refresh the person list.'
          >
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Add a new person.'
          >
						<Link to={'/person/new/'}>
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
								<th>Verified</th>
							</tr>
						</thead>
						<tbody>
							{people.map((person, index) => {

								return (
                  <tr key={index}
										onClick={this.handlePersonRowClick}
										data-person-id={person.id}
                  >
										<td>{person.id}</td>
										<td>
                      {(
                        (person.nameTitle ? person.nameTitle: '')   + ' ' +
                        (person.nameFirst ? person.nameFirst : '')   + ' ' +
                        (person.nameMiddle ? person.nameMiddle : '')  + ' ' +
                        (person.nameLast ? person.nameLast : '')
                      ).trim()}
                    </td>
                    <td>
                      <span
												className='hint-right-middle hint-anim'
												data-hint={person.verified ? 'Verified' : 'Unverified'}
                      >{
                        person.verified ?
                        (<i className='material-icons'>
                          verified_user
                        </i>) :
                        (<i className='material-icons'>
                          lock_open
                        </i>)
                      }
											</span>
										</td>
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
		people     : state.app.people
	};
}

export default connect(mapStateToProps)(PersonList);
