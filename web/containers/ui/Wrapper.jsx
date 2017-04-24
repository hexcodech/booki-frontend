import React
       from 'react';
import {connect}
       from 'react-redux';

import DevTools
       from 'web/containers/dev/DevTools';

import Header
       from 'web/components/ui/Header';
import Notifications
       from 'web/containers/Notifications';

import CSSModules
       from 'react-css-modules';
import styles
       from './Wrapper.scss';

const Wrapper = ({children}) => {

	return (
		<div>
      <Header />
      <div className='col-12' styleName='content'>
				{children}
			</div>
			<Notifications />
			<DevTools />
		</div>
	);
};

export default CSSModules(Wrapper, styles);
