import React
       from 'react';
import {connect}
       from 'react-redux';
import {Link}
       from 'react-router-dom';

import CSSModules
       from 'react-css-modules';
import styles
       from './SidebarListElement.scss';

const SidebarElement = ({text, icon, url, match, pathname}) => {

	return (
		<li styleName={
      pathname.startsWith(match) ? 'list-item-active' : 'list-item'
    }>
			<div styleName='wrapper'>
				<i className='material-icons'>{icon}</i>
				<Link to={url}>
					{text}
				</Link>
			</div>
		</li>
	);
};

export default CSSModules(SidebarElement, styles);
