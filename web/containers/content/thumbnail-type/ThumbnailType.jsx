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
  invalidateThumbnailTypes, clearNewThumbnailType, updateNewThumbnailType,
  fetchThumbnailTypesIfNeeded, putThumbnailType, postThumbnailType,
  deleteThumbnailType
}      from 'core/actions/thumbnail-type';

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

class ThumbnailType extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount', 'handleRefreshClick', 'handleOnChange',
			'handleOnAddNewThumbnailType', 	'handleOnDeleteThumbnailType'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

		dispatch(fetchThumbnailTypesIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidateThumbnailTypes());
		dispatch(fetchThumbnailTypesIfNeeded(accessToken));
	}

	handleOnChange(id, value){
		const {
      dispatch, accessToken,
      newThumbnailType, thumbnailTypes, match: {params: {id: thumbnailTypeId}}
    } = this.props;

		let thumbnailType;

		if(thumbnailTypeId == 'new'){

			thumbnailType = Object.assign({}, newThumbnailType);

			if(set(thumbnailType, id, value)){
				dispatch(
					updateNewThumbnailType(thumbnailType)
				);
			}

		}else{

			thumbnailType = Object.assign({}, thumbnailTypes.filter((thumbnailType) => {
				return thumbnailType.id == thumbnailTypeId;
			})[0]);

			if(set(thumbnailType, id, value)){
				dispatch(
					putThumbnailType(thumbnailType, accessToken)
				);
			}

		}
	}

	handleOnAddNewThumbnailType(e){
		e.preventDefault();
		e.stopPropagation();

		const {dispatch, accessToken, newThumbnailType} = this.props;
		const thumbnailType = Object.assign({}, newThumbnailType);

		dispatch(
			postThumbnailType(thumbnailType, accessToken)
		).then((postedThumbnailType) => {

			if(postedThumbnailType){

				dispatch(
					addNotification({
						title		: 'Created',
						text		: 'The thumbnail type was successfully created.',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS,
					})
				);

				dispatch(
					push('/thumbnailType/' + postedThumbnailType.id + '/')
				);

				dispatch(
					clearNewThumbnailType()
				);
			}
		});
	}

	handleOnDeleteThumbnailType(e){
		e.preventDefault();
		e.stopPropagation();

		const {
      dispatch, thumbnailTypes, accessToken,
      match: {params: {id: thumbnailTypeId}}
    } = this.props;

		let thumbnailType = Object.assign({}, thumbnailTypes.filter((thumbnailType) => {
			return thumbnailType.id == thumbnailTypeId;
		})[0]);

		dispatch(
			deleteThumbnailType(thumbnailType, accessToken)
		).then((success) => {
			if(success){

				dispatch(
					addNotification({
						title		: 'Deleted',
						text		: 'The thumbnail type was successfully deleted',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS,

						actions		: [{
							text: 'Undo',
							color: COLOR_INFO,
							action: (e, notification) => {

								dispatch(
									postThumbnailType(thumbnailType, accessToken)
								).then((postedThumbnailType) => {

									if(postedThumbnailType){
										dispatch(
											push('/thumbnailType/' + postedThumbnailType.id + '/')
										);
									}
									notification.hide();
								});
							}
						}]
					})
				);

				dispatch(
					push('/thumbnailType/list')
				);
			}
		});
	}

	render(){

		const {
      newThumbnailType, thumbnailTypes, match: {params: {id: thumbnailTypeId}},
      dispatch, errors
    } = this.props;

		let thumbnailType;

		if(thumbnailTypeId == 'new'){
			thumbnailType = newThumbnailType;
		}else{
			thumbnailType = thumbnailTypes.filter((thumbnailType) => {
				return thumbnailType.id == thumbnailTypeId;
			})[0];
		}

		if(!thumbnailType){return null;}

		return (
			<div className='thumbnailType'>

				<Actions>
					{thumbnailTypeId !== 'new' &&
						<li>
              <RefreshButton
                date={thumbnailType.lastUpdated}
                loading={thumbnailType.isFetching}
                refreshHandler={this.handleRefreshClick}
              />
						</li>
					}
					{thumbnailTypeId == 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Create thumbnailType'
            >
							<a href='#' onClick={this.handleOnAddNewThumbnailType}>
								<i className='material-icons'>add_circle</i>
							</a>
						</li>
					}
					{thumbnailTypeId !== 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Delete thumbnailType'
            >
							<a href='#' onClick={this.handleOnDeleteThumbnailType}>
								<i className='material-icons'>delete</i>
							</a>
						</li>
					}
				</Actions>

				<Card>
					<h2>Thumbnail type form</h2>

					<form className='profile'>
            <FormGroups
							object={thumbnailType}

              errors={errors.thumbnailType}

							keyPaths={[
								[
                {
                  keyPath       : 'id',
                  label         : 'Type Id'
                },
                {
                  keyPath       : 'name',
                  label         : 'Type name'
                },
								],
								[
                {
                  keyPath       : 'width',
                  label         : 'Thumbnail width',
                  inputType     : 'number',
                  inputProps    : {
                    min  : 0,
                    step : 'any'
                  }
                },
                {
                  keyPath       : 'height',
                  label         : 'Thumbnail height',
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
						data={thumbnailType}
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
		newThumbnailType  : state.app.newThumbnailType,
    thumbnailTypes    : state.app.thumbnailTypes,
    errors        : state.app.validation
	};
}

export default connect(mapStateToProps)(ThumbnailType);
