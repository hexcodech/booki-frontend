import React				from 'react';

import {connect}			from 'react-redux';
import {push}				from 'react-router-redux';
import set					from 'lodash/set';
import bindAll				from 'lodash/bindAll';
import JSONTree				from 'react-json-tree';

import {JSONTreeTheme, COLOR_SUCCESS, COLOR_FAILURE, COLOR_INFO}
							from 'core/constants/color';
import {PERMISSIONS, LANGUAGES}
							from 'core/constants/select-options';

import {invalidateUsers, clearNewUser, updateNewUser, fetchUsersIfNeeded, putUser, postUser, deleteUser}
							from 'core/actions/user';
							
import {addNotification}	from 'core/actions/notification';
							
import {fetchClientsIfNeeded, postClient}
							from 'core/actions/client';


import {selectGenerator, arrayGenerator}
							from 'web/utilities/field-generators';

import RefreshButton		from 'web/components/RefreshButton';
import FormGroups			from 'web/components/form/FormGroups';

import FlagOptionComponent	from 'web/components/form/input/select/FlagOptionComponent';
import FlagValueComponent	from 'web/components/form/input/select/FlagValueComponent';


class User extends React.Component{
	
	constructor(props){
		super(props);
		
		bindAll(this, [
			'componentDidMount', 	'handleRefreshClick', 	'handleOnChange',
			'handleOnAddNewUser', 	'handleOnDeleteUser',	'onClientRowClick'
		]);
	}
	
	componentDidMount() {
		const {dispatch, accessToken} = this.props;
		
		dispatch(fetchUsersIfNeeded(accessToken));
		dispatch(fetchClientsIfNeeded(accessToken));
	}
	
	handleRefreshClick(e) {
		e.preventDefault();
		
		const {dispatch, accessToken} = this.props;
		
		dispatch(invalidateUsers());
		dispatch(fetchUsersIfNeeded(accessToken));
	}
	
	handleOnChange(id, value){
		const {dispatch, accessToken, newUser, users, params: {userId} } = this.props;
		
		let user;
		
		if(userId === 'new'){
			
			user = Object.assign({}, newUser);
			
			if(set(user, id, value)){
				dispatch(
					updateNewUser(user)
				);
			}
			
		}else{
			
			user = Object.assign({}, users.filter((user) => {
				return user._id === userId;
			})[0]);
			
			if(set(user, id, value)){
				dispatch(
					putUser(user, accessToken)
				);
			}
			
		}
	}
	
	handleOnAddNewUser(e){
		e.preventDefault();
		e.stopPropagation();
		
		const {dispatch, accessToken, newUser} = this.props;
		const user = Object.assign({}, newUser);
		
		dispatch(
			postUser(user, accessToken)
		).then((postedUser) => {
			
			if(postedUser){
				
				dispatch(
					addNotification({
						title		: 'Created',
						text		: 'The user was successfully created',
						icon		: 'check_circle',
						hideDelay	: 5000,
						color		: COLOR_SUCCESS,
					})
				);
				
				dispatch(
					push('/dashboard/user/' + postedUser._id + '/')
				);
				
				dispatch(
					clearNewUser()
				);
				
			}
			
		});
	}
	
	handleOnDeleteUser(e){
		e.preventDefault();
		e.stopPropagation();
		
		const {dispatch, users, accessToken, params: {userId}, clients} = this.props;
		
		const user = Object.assign({}, users.filter((user) => {
			return user._id === userId;
		})[0]);
		
		const ownClients = clients.filter((client) => {
			return client.userId === userId;
		});
		
		dispatch(
			deleteUser(user, accessToken)
		).then((success) => {
			if(success){
				
				
				
				dispatch(
					addNotification({
						title		: 'Deleted',
						text		: 'The user was successfully deleted',
						icon		: 'check_circle',
						/*hideDelay	: 10000,*/
						color		: COLOR_SUCCESS,
						
						actions		: [{
							text: 'Undo',
							color: COLOR_INFO,
							action: (e, notification) => {
								
								let promises = [
									dispatch(
										postUser(user, accessToken)
									)
								];
								
								for(let i=0;i<ownClients.length;i++){
									promises.push(
										dispatch(
											postClient(ownClients[i], accessToken)
										)
									);
								}
								
								Promise.all(promises).then((values) => {
									
									//the first argument is the user
									let postedUser = values[0];
									
									if(postedUser){
										dispatch(
											push('/dashboard/user/' + postedUser._id + '/')
										);
									}
									
									notification.hide();
									
								});
								
							}	
						}]
					})
				);
				
				dispatch(
					push('/dashboard/users/')
				);
			}
		});
	}
	
	onClientRowClick(e){
		this.props.dispatch(
			push('/dashboard/client/' + e.currentTarget.getAttribute('data-client-id') + '/')
		);
	}
	
	render(){
		
		const {
			newUser, users, params: {userId}, currentUser,
			clients
		} = this.props;
		
		let user;
		
		if(userId === 'new'){
			
			user = newUser;
			
		}else{
			
			let tmp = users.filter((user) => {
				return user._id === userId;
			});
			
			if(tmp.length === 1){
				user = tmp[0];
			}else{
				user = null;
			}
		}
		
		if(!user){return null;}
		
		
		
		const ownClients = clients.filter((client) => {
			return client.userId === userId;
		});
		
		
		const porfilePictureUrlInput = (id, value='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=512', handleOnChange) => {
			
			return <div className='input-group'>
				<div className='input-group-addon no-padding'>
					<img className='img-thumbnail' src={value} width='50' height='50' />
				</div>
				<input
					id={id}
					className='form-control'
					type='text'
					onChange={(event) => {handleOnChange(event.target.id, event.target.value)}}
					value={value}
				/>
			</div>;
		};
		
		
		return (
			<div className='user'>
			
				<ul className='list-inline list-navigation'>
					{userId !== 'new' &&
						<li className='list-inline-item'>
							<RefreshButton date={user.lastUpdated} loading={user.isFetching} refreshHandler={this.handleRefreshClick} />
						</li>
					}
					{userId === 'new' &&
						<li className='list-inline-item hint-bottom-middle hint-anim' data-hint='Create user'>
							<a className='' href='#' onClick={this.handleOnAddNewUser}>
								<i className='material-icons bottom'>person_add</i>
							</a>
						</li>
					}
					{userId !== 'new' && userId !== currentUser._id &&
						<li className='list-inline-item hint-bottom-middle hint-anim' data-hint='Delete user'>
							<a className='' href='#' onClick={this.handleOnDeleteUser}>
								<i className='material-icons bottom'>delete</i>
							</a>
						</li>
					}
					{userId === currentUser._id &&
						<li className='list-inline-item hint-bottom-middle hint-anim' data-hint='This is your account, be careful.'>
							<i className='material-icons bottom'>face</i>
						</li>
					}
				</ul>
				
				
				<hr/>
				
				<section>
					<h2>User form</h2>
					
					<form className='profile'>
						<FormGroups
							object={user}
							keyPaths={[
								[
									{keyPath: '_id',	label: 'User Id', inputDisabled: true},
									{keyPath: 'locale', label: 'Locale', input: selectGenerator({
										options			: LANGUAGES,
										optionComponent	: FlagOptionComponent,
										valueComponent	: FlagValueComponent
									})}
								],
								[
									{keyPath: 'name.first', label: 'First name'},
									{keyPath: 'name.last',	label: 'Last name'}
								],
								[
									{keyPath: 'name.display', label: 'Display name'}
								],
								[
									{keyPath: 'email.verified',		label: 'Verified email'},
									{keyPath: 'email.unverified',	label: 'Unverified email'}
								],
								[
									{keyPath: 'email.verificationCode', label: 'Email verification code'}
								],
								[
									{keyPath: 'password.resetCode', label: 'Password reset code'}
								],
								[
									{keyPath: 'profilePictureUrl',	label: 'Profile picture url', input: porfilePictureUrlInput},
									{keyPath: 'permissions',		label: 'Permissions', input: arrayGenerator(PERMISSIONS, true, 'Add new permission')}
								],
								[
									{keyPath: 'placeOfResidence',	label: 'Place of residence'},
									{keyPath: 'created',			label: 'Created', inputDisabled: true}
								],
							]}
							handleOnChange={this.handleOnChange}
						/>
						
					</form>
				</section>
				
				{
					ownClients.length > 0 &&
					
					<section>
						<h2>OAuth clients</h2>
						<table className='client-list styled clickable-rows'>
							<thead>
								<tr><th>Name</th><th>Trusted</th></tr>
							</thead>
							<tbody>
								{ownClients.map((client) => {
									return <tr onClick={this.onClientRowClick} key={client._id} data-client-id={client._id}>
										<td>{client.name}</td>
										<td><span className='rel hint-right-middle hint-anim' data-hint={client.trusted ? 'Trusted' : 'Untrusted'}>{
												client.trusted ?
													<i className='material-icons bottom trusted'>verified_user</i> :
													<i className='material-icons bottom untrusted'>lock_open</i>
											}</span>
										</td>
									</tr>;
								})}
							</tbody>
						</table>
					</section>
				}
				
				<section className='json-tree'>
					<h2>Raw JSON</h2>
					<JSONTree
						data={user}
						theme={JSONTreeTheme}
						invertTheme={false}
						hideRoot={true}
						sortObjectKeys={true}
					/>
				</section>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		accessToken	: state.app.authentication.accessToken.token,
		newUser		: state.app.newUser,
		users		: state.app.users,
		clients		: state.app.clients,
		currentUser	: state.app.authentication.user
	};
}

export default connect(mapStateToProps)(User);