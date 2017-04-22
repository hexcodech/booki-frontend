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

import {invalidateThumbnailTypes, fetchThumbnailTypesIfNeeded}
       from 'core/actions/thumbnail-type';

import Card
      from 'web/components/layout/Card';

import {Table}
       from 'web/components/layout/Table';

import Actions
       from 'web/components/layout/Actions';

import RefreshButton
       from 'web/components/RefreshButton';

class ThumbnailTypeList extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, [
			'componentDidMount',
			'handleRefreshClick',
			'handleThumbnailTypeRowClick'
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

	handleThumbnailTypeRowClick(e){
		this.props.dispatch(
			push(
				'/thumbnail-type/' +
        e.currentTarget.getAttribute('data-thumbnail-type-id') + '/'
			)
		);
	}

	render(){

		const {thumbnailTypes} = this.props;

		return (
			<div className='thumbnailType-list'>
        <Actions>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Refresh the thumbnailType list.'
          >
						<RefreshButton refreshHandler={this.handleRefreshClick} />
					</li>
          <li
						className='hint-bottom-middle hint-anim'
						data-hint='Add a new thumbnailType.'
          >
						<Link to={'/thumbnail-type/new/'}>
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
								<th>Width</th>
                <th>Height</th>
							</tr>
						</thead>
						<tbody>
							{thumbnailTypes.map((thumbnailType, index) => {

								return (
                  <tr key={index}
										onClick={this.handleThumbnailTypeRowClick}
										data-thumbnail-type-id={thumbnailType.id}
                  >
										<td>{thumbnailType.id}</td>
										<td>{thumbnailType.name}</td>
                    <td>{thumbnailType.width}</td>
                    <td>{thumbnailType.height}</td>
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
		accessToken     : state.app.authentication.accessToken.token,
		thumbnailTypes  : state.app.thumbnailTypes
	};
}

export default connect(mapStateToProps)(ThumbnailTypeList);
