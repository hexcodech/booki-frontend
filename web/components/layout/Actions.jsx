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

import Card
       from 'web/components/layout/Card';

import CSSModules
       from 'react-css-modules';
import styles
       from './Actions.scss';

const Actions = ({children}) => {

	return (
    <div styleName='actions'>
      <Card>
        <ul>
          {children}
        </ul>
      </Card>
    </div>
  );
};

export default CSSModules(Actions, styles);
