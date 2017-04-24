import React
       from 'react';

import CSSModules
       from 'react-css-modules';
import styles
       from './Header.scss';

import Logo
       from 'web/components/ui/Logo';
import Search
       from 'web/components/ui/Search';
import Button
       from 'web/components/ui/Button';

const Header = ({children}) => {
  return (
    <header styleName='header' className='container'>
      <Logo />
      <Button>
        Beta
      </Button>
      <Search />
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
