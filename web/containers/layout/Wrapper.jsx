import React		from 'react';
import {connect}	from 'react-redux';
import Sidebar		from 'web/containers/layout/Sidebar';

import DevTools		from 'web/containers/dev/DevTools';
import Notifications
					from 'web/containers/Notifications';

const Wrapper = ({children}) => {
	
	return (
		<div className='dashboard-wrapper row'>
			<div className='hidden-sm-down col-md-4 col-lg-3 sidebar-wrapper'>
				<Sidebar />
			</div>
			<div className='col-xs-12 col-md-8 col-lg-9 offset-md-4 offset-lg-3'>
				{children}
			</div>
			<Notifications />
			<DevTools />
		</div>
	);
};

export default connect()(Wrapper);