import React
       from 'react';

import CSSModules
       from 'react-css-modules';
import styles
       from './Footer.scss';

import Logo
       from 'web/components/ui/Logo';

const date = new Date(),
      year = date.getFullYear();

const Footer = ({children, dispatch}) => {
  return (
    <footer styleName='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <Logo color='#fff'/>
            <div styleName='copyright'>
              <p>© Copyright {year} by booki</p>
              <p>All rights reserved</p>
            </div>
          </div>
          <div className='col-xs-12 col-md-4'>
            Lorem
          </div>
          <div className='col-xs-12 col-md-4'>
            Ipsum
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CSSModules(Footer, styles);
