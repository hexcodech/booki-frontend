import React
       from 'react';
import {connect}
       from 'react-redux';
import {action as toggleMenu}
       from 'redux-burger-menu';

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


const NavMenu = (
  <ul>
    <li><a href="/">Kaufen</a></li>
    <li><a href="/">Verkaufen</a></li>
    <li><a href="/">Login</a></li>
  </ul>
);

const Header = ({children, dispatch}) => {
  return (
    <div>
      <Menu
        pageWrapId='page-wrap'
        outerContainerId='outer-container'
      >
        {NavMenu}
      </Menu>
      <header styleName='header' className='container'>
        <Logo />
        <Button>
          Beta
        </Button>
        <Search />
        <div
          styleName='burger-button'
          className='hidden-lg-up'
          onClick={() => {dispatch(toggleMenu(true));}}
        >
          <i className='material-icons'>menu</i>
        </div>
        <nav styleName='nav' className='hidden-md-down'>
          {NavMenu}
        </nav>
      </header>
    </div>
  );
};

export default connect()(CSSModules(Header, styles));
