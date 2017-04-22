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
import {PERMISSIONS, LANGUAGES}
       from 'core/constants/select-options';

import {invalidateUsers, clearNewUser, updateNewUser, fetchUsersIfNeeded, putUser, postUser, deleteUser}
       from 'core/actions/user';

import {addNotification}
       from 'core/actions/notification';

import {fetchClientsIfNeeded, postClient}
       from 'core/actions/client';


import {selectInput, arrayInput}
       from 'web/utilities/input-types';

import RefreshButton
       from 'web/components/RefreshButton';
import {Table}
       from 'web/components/layout/Table';
import Actions
       from 'web/components/layout/Actions';
import FormGroups
       from 'web/components/form/FormGroups';

import Card
       from 'web/components/layout/Card';

import FlagOptionComponent
       from 'web/components/form/input/select/flag/FlagOptionComponent';
import FlagValueComponent
       from 'web/components/form/input/select/flag/FlagValueComponent';


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
		const {
			dispatch, accessToken, newUser, users, match: {params: {id: userId}}
		} = this.props;

		let user;

		if(userId == 'new'){

			user = Object.assign({}, newUser);

      set(user, id, value);

      dispatch(
        updateNewUser(user)
      );

		}else{

			user = Object.assign({}, users.filter((user) => {
				return user.id == userId;
			})[0]);

      set(user, id, value);

      dispatch(
        putUser(user, accessToken)
      );

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
					push('/user/' + postedUser.id + '/')
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

		const {
			dispatch, users, accessToken, match: {params: {id: userId}}, clients
		} = this.props;

		const user = Object.assign({}, users.filter((user) => {
			return user.id == userId;
		})[0]);

		const ownClients = clients.filter((client) => {
			return client.userId == userId;
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
											push('/user/' + postedUser.id + '/')
										);
									}

									notification.hide();

								});

							}
						}]
					})
				);

				dispatch(
					push('/user/list')
				);
			}
		});
	}

	onClientRowClick(e){
		this.props.dispatch(
			push(
				'/client/' + e.currentTarget.getAttribute('data-client-id') + '/'
			)
		);
	}

	render(){

		const {
			newUser, users, currentUser, match: {params: {id: userId}},
			clients, errors
		} = this.props;

		let user;

		if(userId == 'new'){

			user = newUser;

		}else{

			user = users.filter((user) => {
				return user.id == userId;
			})[0];

		}

		if(!user){return null;}


		const ownClients = clients.filter((client) => {
			return client.userId == userId;
		});


		const porfilePictureUrlInput = (
			id,
			value='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=512',
      errors,
			handleOnChange
		) => {

			return <div className='input-group'>
				<div className='input-group-addon'>
					<img src={value} width='50' height='50' />
				</div>
				<input
					id={id}
					className='form-control'
					type='text'
					onChange={
						(event) => {handleOnChange(event.target.id, event.target.value)}
					}
					value={value}
				/>
			</div>;
		};

		return (
			<div className='user'>

				<Actions>
					{userId !== 'new' &&
						<li>
              <RefreshButton
                date={user.lastUpdated}
                loading={user.isFetching}
                refreshHandler={this.handleRefreshClick}
              />
						</li>
					}
					{userId == 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Create user'
            >
							<a href='#' onClick={this.handleOnAddNewUser}>
								<i className='material-icons'>person_add</i>
							</a>
						</li>
					}
					{userId !== 'new' && userId !== currentUser.id &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Delete user'
            >
							<a href='#' onClick={this.handleOnDeleteUser}>
								<i className='material-icons'>delete</i>
							</a>
						</li>
					}
					{userId == currentUser.id &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='This is your account, be careful.'
            >
							<i className='material-icons'>face</i>
						</li>
					}
				</Actions>


        <Card>
          <h2>User form</h2>

          <form className='profile'>
            <FormGroups
              object={user}

              errors={errors.user}

              keyPaths={[
                [
                {keyPath: 'id',	label: 'User Id', inputDisabled: true},
                {keyPath: 'locale', label: 'Locale', inputType: selectInput(
                  {
										options: LANGUAGES,
										optionComponent: FlagOptionComponent,
										valueComponent: FlagValueComponent
                  }, null)
                }
                ],
                [
                {keyPath: 'nameFirst', label: 'First name'},
                {keyPath: 'nameLast',  label: 'Last name'}
                ],

                [
                {keyPath: 'nameDisplay', label: 'Display name'}
                ],

                [
                {keyPath: 'emailVerified',    label: 'Verified email'},
                {keyPath: 'emailUnverified',  label: 'Unverified email'}
                ],

                [
                {
                    keyPath: 'emailVerificationCode',
                    label: 'Email verification code'
                }
                ],
                [
                {keyPath: 'passwordResetCode',  label: 'Password reset code'}
                ],

                [
                {
                    keyPath: 'profilePictureUrl',
                    label: 'Profile picture url',
                    inputType: porfilePictureUrlInput
                },
                {
                  keyPath: 'permissions',
                  label: 'Permissions',
                  inputType: arrayInput(
                    PERMISSIONS, true, 'Add new permission'
                  )
                }
                ],

                [
                {keyPath: 'placeOfResidence', label: 'Place of residence'},
                ],

                [
                {keyPath: 'updatedAt', label: 'Updated', inputDisabled: true},
                {keyPath: 'createdAt', label: 'Created', inputDisabled: true}
                ]
              ]}
              handleOnChange={this.handleOnChange}
            />

          </form>
        </Card>

        {
          ownClients.length > 0 &&

            <Card>
              <h2>OAuth clients</h2>
              <Table interactive={true}>
                <thead>
                  <tr><th>Name</th><th>Trusted</th></tr>
                </thead>
                <tbody>
                  {ownClients.map((client) => {
                    return (
                      <tr
                        onClick={this.onClientRowClick}
                        key={client.id}
                        data-client-id={client.id}
                      >
                        <td>{client.name}</td>
                        <td>
                          <span
                            className='hint-right-middle hint-anim'
                            data-hint={
                              client.trusted ? 'Trusted' : 'Untrusted'
                            }
                          >
                            {client.trusted ?
                              (<i className='material-icons'>
                                verified_user
                              </i>) :
                              (<i className='material-icons'>
                                lock_open
                              </i>)
                            }
                          </span>
                        </td>
                      </tr>);
                  })}
                </tbody>
              </Table>
            </Card>
				}

        <Card>
          <h2>Raw JSON</h2>
          <JSONTree
            data={user}
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
		newUser     : state.app.newUser,
		users       : state.app.users,
		clients     : state.app.clients,
		currentUser : state.app.authentication.user,
    errors      : state.app.validation
	};
}

export default connect(mapStateToProps)(User);
