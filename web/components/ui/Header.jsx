import React
       from 'react';

import CSSModules
       from 'react-css-modules';
import styles
       from './Header.scss';

import Logo
       from 'web/components/ui/Logo';
import Menu
      from 'web/components/ui/Burger';
import Search
       from 'web/components/ui/Search';
import Button
       from 'web/components/ui/Button';

const Header = ({children}) => {
  return (
    <div>
      <Menu
        pageWrapId='page-wrap'
        outerContainerId='outer-container'
      >
        <a id="home" className="menu-item" href="/">Home</a>
      </Menu>
      <header styleName='header' className='container'>
        <Logo />
        <Button>
          Beta
        </Button>
        <Search />
        <nav styleName='nav' className='hidden-md-down'>
          <ul>
            <li>Kaufen</li>
            <li>Verkaufen</li>
            <li>Login</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default CSSModules(Header, styles);
