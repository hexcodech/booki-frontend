import React		from 'react';
import {connect}	from 'react-redux';
import TimeAgo		from 'react-timeago';

import {addNotification}
					from 'core/actions/notification';

import Notification	from 'web/components/notifications/Notification';

const Notifications = ({notifications, dispatch}) => {
	return (
		<div className="notifications">
			{notifications.sort((a, b) => {
				return b.timestamp - a.timestamp
			}).map((notification, index) => {
				return <Notification key={index} notification={notification} />;
			})}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		notifications	: state.app.notifications
	};
}

export default connect(mapStateToProps)(Notifications);