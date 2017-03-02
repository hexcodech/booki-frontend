import React				from 'react';
import {connect}			from 'react-redux';
import {Link}				from 'react-router';

const SidebarElement = ({text, icon, url, active}) => {
	
	return (
		<li className={active ? 'list-group-item active' : 'list-group-item'}>
			<div className='valign-center max-block'>
				<i className='material-icons'>{icon}</i>
				<Link to={url} className='max-block'>
					{text}
				</Link>
			</div>
		</li>
	);
};

const mapStatesToProps = (state, props) => {
	
	return {
		active: state.routing.locationBeforeTransitions.pathname === props.url
	};
};

export default connect(mapStatesToProps)(SidebarElement);