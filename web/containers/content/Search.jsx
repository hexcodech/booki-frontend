import React
       from 'react';
import {connect}
       from 'react-redux';

import CSSModules
       from 'react-css-modules';
import styles
       from './Search.scss';

import Loader
       from 'halogen/RingLoader';

const Search = ({accessToken, books, match}) => {
  return (
    <div styleName='search' className='container'>
      <h1>Suchresultate für "{match.params.search}"</h1>
      <div className='row'>
        {
          books.length === 0 ?
            <div styleName='loader'>
              <Loader color='#FFC676' size='75px' />
            </div> :

          books.map((books) => {
            return;
          })

        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
	return {
		accessToken : state.app.authentication.accessToken.token,
		books       : state.app.lookedUpBooks
	};
}

export default connect(mapStateToProps)(CSSModules(Search, styles));
