import React		from 'react';
import {connect}	from 'react-redux';

const onMouseEnter = (color) => {
	return (e) => {
		e.target.setAttribute("style", "color: " + color);
	};
}

const onMouseLeave = (e) => {
	e.target.removeAttribute("style");
}

const onMouseClick = (action, notification) => {
	return (e) => {
		action.action(e, notification);
	};
}

const Notification = ({notification}) => {
	
	const {uuid, fadeIn, fadeOut, color, icon, title, text, hideDelay, timestamp, actions} = notification;
	
	return (
		<div
			key={uuid}
			className={'notification' + (fadeIn ? ' fade-in' : '') + (fadeOut ? ' fade-out' : '')}
			style={{borderTopColor: color}}
		>
			<div className='row'>
				<div className='col-2 icon'>
					<i className='material-icons bottom v-center'>{icon}</i>
				</div>
				<div className='col-7'>
					<h6>{title}</h6>
					<p>
						{text}
					</p>
					{
						hideDelay &&
						<small>
							{'Will hide in '}
							<TimeAgo
								date={timestamp + hideDelay}
								formatter={(value, unit) => {
									return value + ' ' + unit + (value > 1 ? 's' : '');
								}}
							/>
						</small>
					}
				</div>
				<div className='col-3 actions'>
					<div className={(actions.length === 1 ? ' v-center' : '')}>
						{actions.map((action, index) => {
							return <button
								key={index}
								onMouseEnter={onMouseEnter(action.color)}
								onMouseLeave={onMouseLeave}
								onClick={onMouseClick(action, notification)}
							>
									{action.text}
							</button>;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect()(Notification);