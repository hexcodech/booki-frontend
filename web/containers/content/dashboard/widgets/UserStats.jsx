import React
       from 'react';
import {connect}
       from 'react-redux';
import bindAll
       from 'lodash/bindAll';

import {fetchUsersIfNeeded}
       from 'core/actions/user';
import {invalidateUsers}
       from 'app/actions/system-stats';

import Widget
       from 'web/containers/content/dashboard/widgets/Widget';

class UserWidget extends React.Component{

	constructor(props){
		super(props);

		bindAll(this, ['componentDidMount', 'handleRefreshClick']);
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

	render(){
		const {users} = this.props;

		const newUsers = users.filter((user) => {
			return new Date(user.created).getTime() >= (Date.now() - 1000 * 60 * 60 * 24 * 7);
		});

		return (
			<Widget handleRefreshClick={this.handleRefreshClick}>
				<p>{users.length} Users registered</p>
				<small>
					{newUsers.length} within the last week
				</small>
			</Widget>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		accessToken	: state.app.authentication.accessToken.token,
		users		: state.app.users
	};
}

export default connect(mapStateToProps)(UserWidget);
