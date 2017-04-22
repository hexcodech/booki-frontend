import React
       from 'react';
import {connect}
       from 'react-redux';

import Sidebar
       from 'web/containers/layout/Sidebar';

import DevTools
       from 'web/containers/dev/DevTools';
import Notifications
       from 'web/containers/Notifications';

import CSSModules
       from 'react-css-modules';
import styles
       from './Wrapper.scss';

const Wrapper = ({children}) => {

	return (
		<div>
			<div className='col-md-4 col-lg-3' styleName='sidebar'>
				<Sidebar />
			</div>
      <div
        className='col-12 offset-md-4 col-md-8 offset-lg-3 col-lg-9'
        styleName='content'
      >
				{children}
			</div>
			<Notifications />
			<DevTools />
		</div>
	);
};

export default CSSModules(Wrapper, styles);
