import React
       from 'react';

import CSSModules
       from 'react-css-modules';
import styles
       from './Card.scss';

const Card = (props) => {
  return (
    <div styleName='card' {...props}>
      {props.children}
    </div>
  );
};

export default CSSModules(Card, styles);
