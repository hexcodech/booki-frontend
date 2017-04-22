import React
       from 'react';
import {connect}
       from 'react-redux';
import {push}
       from 'react-router-redux';

import SidebarListElement
       from 'web/components/sidebar/SidebarListElement';

import CSSModules
       from 'react-css-modules';
import styles
       from './Sidebar.scss';

const Sidebar = ({user, pathname, dispatch}) => {

	let width	= window.innerWidth ||
	            document.documentElement.clientWidth ||
							document.body.clientWidth;

	let height	= window.innerHeight ||
	              document.documentElement.clientHeight ||
								document.body.clientHeight;

	let bgStyles = {
		background: 'linear-gradient(' +
			'rgba(255, 173, 57, 1), rgba(255, 173, 57, 0.45)' +
		'), url(' +
			'https://source.unsplash.com/random/' + Math.round(width/3)+'x'+height +
		'/weekly)'
	};

	return (
		<aside styleName='sidebar' style={bgStyles}>
			<figure
				styleName='profile-picture'
				onClick={() => {
					dispatch(
						push('/user/' + user.id + '/')
					)
        }}>

				<img src={user.profilePictureUrl} height='100' width='100'/>
				<p styleName='user-name'>
					{user.nameDisplay}
				</p>
			</figure>

			<ul styleName='link-list'>
        <SidebarListElement
					text='Dashboard'
					icon='dashboard'
					url='/dashboard/'
          match='/dashboard/'
          pathname={pathname}
        />
        <SidebarListElement
					text='Users'
					icon='supervisor_account'
					url='/user/list'
          match='/user/'
          pathname={pathname}
        />
        <SidebarListElement
					text='OAuthClients'
					icon='business'
					url='/client/list'
          match='/client/'
          pathname={pathname}
        />
        <SidebarListElement
					text='People'
					icon='nature_people'
					url='/person/list'
          match='/person/'
          pathname={pathname}
        />
        <SidebarListElement
					text='Conditions'
					icon='check_circle'
					url='/condition/list'
          match='/condition/'
          pathname={pathname}
        />
        <SidebarListElement
					text='Books'
					icon='book'
					url='/book/list'
          match='/book/'
          pathname={pathname}
        />
        <SidebarListElement
					text='Thumbnail types'
					icon='list'
					url='/thumbnail-type/list'
          match='/thumbnail-type/'
          pathname={pathname}
        />
        <SidebarListElement
					text='Images'
					icon='image'
					url='/image/list'
          match='/image/'
          pathname={pathname}
        />
        <SidebarListElement
					text='Offers'
					icon='local_offer'
					url='/offer/list'
          match='/offer/'
          pathname={pathname}
        />
			</ul>
		</aside>
	);
};

const mapStateToProps = (state) => {
	return {
		user     : state.app.authentication.user,
    pathname : state.router.location.pathname
	};
};

export default connect(mapStateToProps)(CSSModules(Sidebar, styles));
