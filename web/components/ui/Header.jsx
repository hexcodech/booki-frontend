import React
       from 'react';

import CSSModules
       from 'react-css-modules';
import styles
       from './Header.scss';

import Logo
       from 'web/components/ui/Logo';
import Button
       from 'web/components/ui/Button';

const Header = ({children}) => {
  return (
    <header styleName='header' className='container'>
      <Logo />
      <Button>
        Beta
      </Button>
      <div className='input-group' styleName='searchbar'>
        <input type='search' className='form-control' placeholder='Suchen...' />
        <div className='input-group-addon' styleName='search-button'>
          <i className='material-icons'>search</i>
        </div>
      </div>
      <nav styleName='nav'>
        <ul>
          <li>Kaufen</li>
          <li>Verkaufen</li>
          <li>Login</li>
        </ul>
      </nav>
    </header>
  );
};

export default CSSModules(Header, styles);
