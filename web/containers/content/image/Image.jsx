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

import {API_URL}
       from 'config.json';

import {JSONTreeTheme, COLOR_SUCCESS, COLOR_FAILURE, COLOR_INFO}
       from 'core/constants/color';

import {
  invalidateImages, fetchImagesIfNeeded, putImage, postImage, deleteImage
}      from 'core/actions/image';

import {fetchUsersIfNeeded}
       from 'core/actions/user';
import {addNotification}
       from 'core/actions/notification';

import Dropzone
       from 'react-dropzone';
import {Table}
       from 'web/components/layout/Table';
import RefreshButton
       from 'web/components/RefreshButton';
import Actions
       from 'web/components/layout/Actions';
import FormGroups
       from 'web/components/form/FormGroups';

import Card
       from 'web/components/layout/Card';

class Image extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount', 	'handleRefreshClick',
			'handleOnDeleteImage', 'onDrop'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

		dispatch(fetchImagesIfNeeded(accessToken));
		dispatch(fetchUsersIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidateImages());
		dispatch(fetchImagesIfNeeded(accessToken));
	}


	handleOnDeleteImage(e){
		e.preventDefault();
		e.stopPropagation();

		const {
      dispatch, images, accessToken, match: {params: {id: imageId}}
    } = this.props;

		let image = Object.assign({}, images.filter((image) => {
			return image.id == imageId;
		})[0]);

		dispatch(
			deleteImage(image, accessToken)
		).then((success) => {
			if(success){

				dispatch(
					addNotification({
						title		: 'Deleted',
						text		: 'The image was successfully deleted',
						icon		: 'check_circle',
						color		: COLOR_SUCCESS
					})
				);

				dispatch(
					push('/image/list')
				);
			}
		});
	}

  onDrop(acceptedFiles, rejectedFiles){
    const {dispatch, accessToken} = this.props;

    let formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    dispatch(
      postImage(formData, accessToken)
    ).then((image) => {
      dispatch(
        push('/image/' + image.id + '/')
      );
    });
  }

	render(){

		const {
      images, match: {params: {id: imageId}}, users, dispatch, errors
    } = this.props;

		let image;

		if(imageId == 'new'){

			image = {};

		}else{

			image = images.filter((image) => {
				return image.id == imageId;
			})[0];

		}

		if(!image){return null;}

    const imageSrcInput = (id, value='', errors) => {

			return (<div className='input-group'>
        <div className='input-group-addon'>
          <img
            src={
              imageId !== 'new' ?
                API_URL + image.url : ''
            }
            width='50'
            height='50'
          />
        </div>
        <input
					id={id}
					className='form-control'
					type='text'
          disabled={true}
					value={value}
        />
      </div>);

		};

		return (
			<div className='image'>

				<Actions>
					{imageId !== 'new' &&
						<li>
              <RefreshButton
                date={image.lastUpdated}
                loading={image.isFetching}
                refreshHandler={this.handleRefreshClick}
              />
						</li>
					}
					{imageId !== 'new' &&
            <li
              className='hint-bottom-middle hint-anim'
              data-hint='Delete image'
            >
							<a href='#' onClick={this.handleOnDeleteImage}>
								<i className='material-icons'>delete</i>
							</a>
						</li>
					}
				</Actions>

				<Card>
					<h2>Image form</h2>

					<form className='profile'>
            <FormGroups
							object={image}

              errors={errors.image}

							keyPaths={[
                [
                {
                  keyPath       : 'id',
                  label         : 'Image Id',
                  inputDisabled : true
                },
                {
                  keyPath       : 'mimeType',
                  label         : 'Mime Type',
                  inputDisabled : true
                },
								],
								[
                {
                  keyPath       : 'width',
                  label         : 'Width',
                  inputDisabled : true
                },
                {
                  keyPath       : 'height',
                  label         : 'Height',
                  inputDisabled : true
                }
								],
								[
                {
                  keyPath       : 'userId',
                  label         : 'User Id',
                  inputDisabled : true
                },
                {
                  keyPath       : 'fileId',
                  label         : 'File Id',
                  inputDisabled : true
                }
                ],
                [
                {
                  keyPath       : 'url',
                  label         : 'URL',
                  inputType     : imageSrcInput
                }
                ]
							]}
							handleOnChange={()=>{}}
            />
            {imageId === 'new' &&
              <Dropzone
                className='dropzone'
                activeClassName='dropzone-active'
                rejectClassName='dropzone-reject'
                onDrop={this.onDrop}
                preventDropOnDocument={true}
                maxSize={1024*1024 * 2}
                multiple={false}
                accept='image/*'
              >
                <div className='center'>Drag the image file here</div>
              </Dropzone>
            }
					</form>
				</Card>

        {image.thumbnails &&
          <Card>
            <h2>Thumbnails</h2>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>URL</th>
                  <th>Thumbnail type</th>
                  <th>Width</th>
                  <th>Height</th>
                </tr>
              </thead>
              <tbody>
                {image.thumbnails.map((thumbnail) => {
                  return (
                    <tr key={thumbnail.id}>
                      <td>{thumbnail.id}</td>
                      <td>{thumbnail.url}</td>
                      <td>{thumbnail.name}</td>
                      <td>{thumbnail.width}</td>
                      <td>{thumbnail.height}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        }

        <Card>
					<h2>Raw JSON</h2>
          <JSONTree
						data={image}
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
		images      : state.app.images,
		users       : state.app.users,
    errors      : state.app.validation
	};
}

export default connect(mapStateToProps)(Image);
