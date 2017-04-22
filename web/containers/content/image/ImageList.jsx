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

import {invalidateImages, fetchImagesIfNeeded}
       from 'core/actions/image';

import RefreshButton
       from 'web/components/RefreshButton';
import {Table}
       from 'web/components/layout/Table';
import Actions
       from 'web/components/layout/Actions';
import Card
      from 'web/components/layout/Card';

class ImageList extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount', 'handleRefreshClick', 'handleImageRowClick'
		]);
	}

	componentDidMount() {
		const {dispatch, accessToken} = this.props;

		dispatch(fetchImagesIfNeeded(accessToken));
	}

	handleRefreshClick(e) {
		e.preventDefault();

		const {dispatch, accessToken} = this.props;

		dispatch(invalidateImages());
		dispatch(fetchImagesIfNeeded(accessToken));
	}

	handleImageRowClick(e){
		this.props.dispatch(
			push('/image/' + e.currentTarget.getAttribute('data-image-id') + '/')
		);
	}

	render(){

		const {images} = this.props;

		return (
			<div className='image-list'>
				<Actions>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Refresh the image list.'
          >
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Add a new image.'
          >
						<Link to={'/image/new/'}>
							<i className='material-icons'>add</i>
						</Link>
					</li>
				</Actions>

        <Card>
          <Table interactive={true}>
            <thead>
              <tr>
                <th>ID</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {images.map((image, index) => {
                return (
                  <tr
                    key={index}
                    onClick={this.handleImageRowClick}
                    data-image-id={image.id}
                  >
                    <td>{image.id}</td>
                    <td>{image.url}</td>
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
		images      : state.app.images
	};
}

export default connect(mapStateToProps)(ImageList);
