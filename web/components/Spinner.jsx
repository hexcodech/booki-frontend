import React
       from 'react';

import CSSModules
       from 'react-css-modules';
import styles
       from './Spinner.scss';

const Spinner = () => {
  return (
    <div>
      <div className='wrapper'>
        <div styleName='spinner'>
          <div styleName='rect1'></div>
          <div styleName='rect2'></div>
          <div styleName='rect3'></div>
          <div styleName='rect4'></div>
          <div styleName='rect5'></div>
        </div>
        <p className='description'>
          Loading...
        </p>
      </div>
    </div>
  );
}

export default CSSModules(Spinner, styles);
