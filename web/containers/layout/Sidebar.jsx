import React				from 'react';
import {connect}			from 'react-redux';
import {push}				from 'react-router-redux';

import SidebarListElement	from 'web/components/sidebar/SidebarListElement';

const Sidebar = ({userId, name, profilePictureUrl, dispatch}) => {
	
	let width	= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let height	= window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	let bgStyles = {
		background: 'linear-gradient(rgba(255, 173, 57, 1), rgba(255, 173, 57, 0.45)),' + 
		'url(https://source.unsplash.com/random/' + Math.round(width/3) + 'x' + height + ')',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover'
	};
	
	return (
		<aside className='sidebar bg-primary' style={bgStyles}>
			<figure className='profile-picture clickable' onClick={()=>{dispatch(push('/dashboard/user/' + userId + '/'))}}>
				<img src={profilePictureUrl} className='mx-auto d-block' height='100' width='100' />
				<p className='text-center user-name'>
					{name.display}
				</p>
			</figure>
			<ul className='list-group'>
				<SidebarListElement text='Dashboard' icon='dashboard' url='/dashboard/' />
				<SidebarListElement text='Users' icon='supervisor_account' url='/dashboard/users/' />
				<SidebarListElement text='OAuthClients' icon='business' url='/dashboard/clients/' />
				<SidebarListElement text='Books' icon='book' url='/dashboard/books/' />
			</ul>
		</aside>
	);
};

const mapStateToProps = (state) => {
	return {
		userId				: state.app.authentication.user._id,
		name				: state.app.authentication.user.name,
		profilePictureUrl	: state.app.authentication.user.profilePictureUrl
	};
};

export default connect(mapStateToProps)(Sidebar);