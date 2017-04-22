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

import {API_URL}
       from 'config.json';

import {invalidateUsers, fetchUsersIfNeeded}
       from 'core/actions/user';


import Card
      from 'web/components/layout/Card';

import {Table}
       from 'web/components/layout/Table';

import Actions
       from 'web/components/layout/Actions';

import RefreshButton
       from 'web/components/RefreshButton';


class UserList extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount',
			'handleRefreshClick',
			'handleUserRowClick'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

		dispatch(fetchUsersIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidateUsers());
		dispatch(fetchUsersIfNeeded(accessToken));
	}

	handleUserRowClick(e){
		this.props.dispatch(
			push(
				'/user/' + e.currentTarget.getAttribute('data-user-id') + '/'
			)
		);
	}

	render(){

		const {users, currentUser} = this.props;
		return (
			<div className='user-list'>
				<Actions>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Refresh the user list.'
          >
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Add a new user.'
          >
						<Link to={'/user/new/'}>
							<i className='material-icons bottom'>add</i>
						</Link>
					</li>
				</Actions>

				<Card>
					<Table interactive={true}>
						<thead>
							<tr>
								<th></th>
								<th>ID</th>
								<th>First name</th>
								<th>Last name</th>
								<th>Email</th>
								<th>Locale</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => {

								return (
                  <tr
										key={index}
										onClick={this.handleUserRowClick}
										data-user-id={user.id}
                  >
										<td>
											{
												user.permissions.indexOf('admin') !== -1 &&
                          <span
														className='hint-bottom-middle hint-anim'
														data-hint='Admin'
                          >
														<i className='material-icons'>gavel</i>
													</span>
											}
											{
												user.id == currentUser.id &&
                          <span
														className='hint-bottom-middle hint-anim'
														data-hint='This is your account.'
                          >
														<i className='material-icons'>face</i>
													</span>
											}
										</td>
										<td>{user.id}</td>
										<td>{user.nameFirst}</td>
										<td>{user.nameLast}</td>
										<td>{user.emailVerified}</td>
										<td>
                      <span
												className='hint-right-middle hint-anim'
												data-hint={user.locale}
                      >
                        <img
													height='20'
													width='20'
													src={
														API_URL + '/static/res/img/locales/' + user.locale
														+ '.svg'
													}
                        />
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
		users       : state.app.users,
		currentUser : state.app.authentication.user
	};
}

export default connect(mapStateToProps)(UserList);
