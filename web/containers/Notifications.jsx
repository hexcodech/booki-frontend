import React from "react";
import { connect } from "react-redux";

import { addNotification } from "core/actions/notification";

import Notification from "web/components/notifications/Notification";

import "./Notifications.scss";

const Notifications = ({ notifications, dispatch }) => {
	return (
		<div styleName="notifications">
			{notifications
				.sort((a, b) => {
					return b.timestamp - a.timestamp;
				})
				.map((notification, index) => {
					return (
						<Notification
							key={notification.timestamp}
							notification={notification}
						/>
					);
				})}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		notifications: state.app.notifications
	};
};

export default connect(mapStateToProps)(Notifications);
