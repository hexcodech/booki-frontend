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
  invalidateConditions, clearNewCondition, updateNewCondition,
  fetchConditionsIfNeeded, putCondition, postCondition, deleteCondition
}      from 'core/actions/condition';

import {addNotification}
       from 'core/actions/notification';

import RefreshButton
       from 'web/components/RefreshButton';
import Actions
       from 'web/components/layout/Actions';
import FormGroups
       from 'web/components/form/FormGroups';

import Card
       from 'web/components/layout/Card';

class Condition extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount', 	'handleRefreshClick', 	'handleOnChange',
			'handleOnAddNewCondition', 	'handleOnDeleteCondition'
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

	handleOnChange(id, value){
		const {
      dispatch, accessToken,
      newCondition, conditions, match: {params: {id: conditionId}}
    } = this.props;

		let condition;

		if(conditionId == 'new'){

			condition = Object.assign({}, newCondition);

			if(set(condition, id, value)){
				dispatch(
					updateNewCondition(condition)
				);
			}

		}else{

			condition = Object.assign({}, conditions.filter((condition) => {
				return condition.id == conditionId;
			})[0]);

			if(set(condition, id, value)){
				dispatch(
					putCondition(condition, accessToken)
				);
			}

		}
	}

	handleOnAddNewCondition(e){
		e.preventDefault();
		e.stopPropagation();

		const {dispatch, accessToken, newCondition} = this.props;
		const condition = Object.assign({}, newCondition);

		dispatch(
			postCondition(condition, accessToken)
		).then((postedCondition) => {

			if(postedCondition){

				dispatch(
					addNotification({
						title		: 'Created',
						text		: 'The condition was successfully created.',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS,
					})
				);

				dispatch(
					push('/condition/' + postedCondition.id + '/')
				);

				dispatch(
					clearNewCondition()
				);
			}
		});
	}

	handleOnDeleteCondition(e){
		e.preventDefault();
		e.stopPropagation();

		const {
      dispatch, conditions, accessToken, match: {params: {id: conditionId}}
    } = this.props;

		let condition = Object.assign({}, conditions.filter((condition) => {
			return condition.id == conditionId;
		})[0]);

		dispatch(
			deleteCondition(condition, accessToken)
		).then((success) => {
			if(success){

				dispatch(
					addNotification({
						title		: 'Deleted',
						text		: 'The condition was successfully deleted',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS,

						actions		: [{
							text: 'Undo',
							color: COLOR_INFO,
							action: (e, notification) => {

								dispatch(
									postCondition(condition, accessToken)
								).then((postedCondition) => {

									if(postedCondition){
										dispatch(
											push('/condition/' + postedCondition.id + '/')
										);
									}
									notification.hide();
								});
							}
						}]
					})
				);

				dispatch(
					push('/condition/list')
				);
			}
		});
	}

	render(){

		const {
      newCondition, conditions, match: {params: {id: conditionId}},
      dispatch, errors
    } = this.props;

		let condition;

		if(conditionId == 'new'){
			condition = newCondition;
		}else{
			condition = conditions.filter((condition) => {
				return condition.id == conditionId;
			})[0];
		}

		if(!condition){return null;}

		return (
			<div className='condition'>

				<Actions>
					{conditionId !== 'new' &&
						<li>
              <RefreshButton
                date={condition.lastUpdated}
                loading={condition.isFetching}
                refreshHandler={this.handleRefreshClick}
              />
						</li>
					}
					{conditionId == 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Create condition'
            >
							<a href='#' onClick={this.handleOnAddNewCondition}>
								<i className='material-icons'>add_circle</i>
							</a>
						</li>
					}
					{conditionId !== 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Delete condition'
            >
							<a href='#' onClick={this.handleOnDeleteCondition}>
								<i className='material-icons'>delete</i>
							</a>
						</li>
					}
				</Actions>

				<Card>
					<h2>Condition form</h2>

					<form className='profile'>
            <FormGroups
							object={condition}

              errors={errors.condition}

							keyPaths={[
								[
                {
                  keyPath       : 'id',
                  label         : 'Condition Id'
                },
                {
                  keyPath       : 'key',
                  label         : 'Condition key'
                },
								],
								[
                {
                  keyPath       : 'priceFactor',
                  label         : 'Price Factor',
                  inputType     : 'number',
                  inputProps    : {
                    min  : 0,
                    step : 'any'
                  }
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
						data={condition}
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
		newCondition  : state.app.newCondition,
    conditions    : state.app.conditions,
    errors        : state.app.validation
	};
}

export default connect(mapStateToProps)(Condition);
