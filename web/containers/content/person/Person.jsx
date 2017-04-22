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
  invalidatePeople, clearNewPerson, updateNewPerson,
  fetchPeopleIfNeeded, putPerson, postPerson, deletePerson
}      from 'core/actions/person';

import {addNotification}
       from 'core/actions/notification';

import {checkboxInput}
       from 'web/utilities/input-types';

import RefreshButton
       from 'web/components/RefreshButton';
import Actions
       from 'web/components/layout/Actions';
import FormGroups
       from 'web/components/form/FormGroups';

import Card
       from 'web/components/layout/Card';

class Person extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount', 	'handleRefreshClick', 	'handleOnChange',
			'handleOnAddNewPerson', 	'handleOnDeletePerson'
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

	handleOnChange(id, value){
		const {
      dispatch, accessToken,
      newPerson, people, match: {params: {id: personId}}
    } = this.props;

		let person;

		if(personId == 'new'){

			person = Object.assign({}, newPerson);

			if(set(person, id, value)){
				dispatch(
					updateNewPerson(person)
				);
			}

		}else{

			person = Object.assign({}, people.filter((person) => {
				return person.id == personId;
			})[0]);

			if(set(person, id, value)){
				dispatch(
					putPerson(person, accessToken)
				);
			}
		}
	}

	handleOnAddNewPerson(e){
		e.preventDefault();
		e.stopPropagation();

		const {dispatch, accessToken, newPerson} = this.props;
		const person = Object.assign({}, newPerson);

		dispatch(
			postPerson(person, accessToken)
		).then((postedPerson) => {

			if(postedPerson){

				dispatch(
					addNotification({
						title		: 'Created',
						text		: 'The person was successfully created.',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS,
					})
				);

				dispatch(
					push('/person/' + postedPerson.id + '/')
				);

				dispatch(
					clearNewPerson()
				);
			}
		});
	}

	handleOnDeletePerson(e){
		e.preventDefault();
		e.stopPropagation();

		const {
      dispatch, people, accessToken, match: {params: {id: personId}}
    } = this.props;

		let person = Object.assign({}, people.filter((person) => {
			return person.id == personId;
		})[0]);

		dispatch(
			deletePerson(person, accessToken)
		).then((success) => {
			if(success){

				dispatch(
					addNotification({
						title		: 'Deleted',
						text		: 'The person was successfully deleted',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS,

						actions		: [{
							text: 'Undo',
							color: COLOR_INFO,
							action: (e, notification) => {

								dispatch(
									postPerson(person, accessToken)
								).then((postedPerson) => {

									if(postedPerson){
										dispatch(
											push('/person/' + postedPerson.id + '/')
										);
									}
									notification.hide();
								});
							}
						}]
					})
				);

				dispatch(
					push('/person/list')
				);
			}
		});
	}

	render(){

		const {
      newPerson, people, match: {params: {id: personId}},
      dispatch, errors
    } = this.props;

		let person;

		if(personId == 'new'){
			person = newPerson;
		}else{
			person = people.filter((person) => {
				return person.id == personId;
			})[0];
		}

		if(!person){return null;}

		return (
			<div className='person'>

				<Actions>
					{personId !== 'new' &&
						<li>
              <RefreshButton
                date={person.lastUpdated}
                loading={person.isFetching}
                refreshHandler={this.handleRefreshClick}
              />
						</li>
					}
					{personId == 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Create person'
            >
							<a href='#' onClick={this.handleOnAddNewPerson}>
								<i className='material-icons'>add_circle</i>
							</a>
						</li>
					}
					{personId !== 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Delete person'
            >
							<a href='#' onClick={this.handleOnDeletePerson}>
								<i className='material-icons'>delete</i>
							</a>
						</li>
					}
				</Actions>

				<Card>
					<h2>Person form</h2>

					<form className='profile'>
            <FormGroups
							object={person}

              errors={errors.person}

							keyPaths={[
								[
                {
                  keyPath       : 'id',
                  label         : 'Person Id'
                },
                {
                  keyPath       : 'nameTitle',
                  label         : 'Title'
                },
								],
								[
                {
                  keyPath       : 'nameFirst',
                  label         : 'First name',
                },
                {
                  keyPath       : 'nameMiddle',
                  label         : 'Middle name',
                }
                ],
                [
                {
                  keyPath       : 'nameLast',
                  label         : 'Last name',
                },
                {
                  keyPath       : 'verified',
                  label         : 'Verified',
                  inputType     : checkboxInput()
                }
								]
							]}
							handleOnChange={this.handleOnChange}
            />

					</form>
				</Card>

        <Card>
					<h2>Raw JSON</h2>
          <JSONTree
						data={person}
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
		accessToken   : state.app.authentication.accessToken.token,
		newPerson     : state.app.newPerson,
    people       : state.app.people,
    errors        : state.app.validation
	};
}

export default connect(mapStateToProps)(Person);
