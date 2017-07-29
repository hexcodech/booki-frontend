import React from "react";

import "./Notification.scss";

const onMouseEnter = color => {
	return e => {
		e.target.setAttribute("style", "color: " + color);
	};
};

const onMouseLeave = e => {
	e.target.removeAttribute("style");
};

const onMouseClick = (action, notification) => {
	return e => {
		action.action(e, notification);
	};
};

const Notification = ({ notification }) => {
	const {
		uuid,
		fadeIn,
		fadeOut,
		color,
		title,
		text,
		hideDelay,
		timestamp,
		actions
	} = notification;

	return (
		<div
			key={uuid}
			styleName={
				"notification" +
				(fadeIn ? "-fade-in" : "") +
				(fadeOut ? "-fade-out" : "")
			}
			style={{ borderTopColor: color }}
		>
			<div className="row">
				<div className="col-9">
					<h6 styleName="title">{title}</h6>
					<p styleName="content">
						{text}
					</p>
				</div>
				<div className="col-3" styleName="actions-wrapper">
					<div styleName={actions.length === 1 ? "actions-center" : "actions"}>
						{actions.map((action, index) => {
							return (
								<button
									styleName="action"
									key={index}
									onMouseEnter={onMouseEnter(action.color)}
									onMouseLeave={onMouseLeave}
									onClick={onMouseClick(action, notification)}
								>
									{action.text}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notification;
