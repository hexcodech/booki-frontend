import React
       from 'react';

import CSSModules
       from 'react-css-modules';
import styles
       from './Button.scss';

const Button = ({children}) => {
  return (
    <button styleName='button'>
      {children}
    </button>
  );
};

export default CSSModules(Button, styles);
