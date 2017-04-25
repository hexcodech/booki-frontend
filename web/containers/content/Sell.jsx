import React
       from 'react';
import {connect}
       from 'react-redux';
import {push}
       from 'react-router-redux';

import CSSModules
       from 'react-css-modules';
import styles
       from './Sell.scss';

const Sell = ({accessToken, dispatch}) => {

  if(!accessToken){
    dispatch(
      push('/login')
    );
  }

  return (
    <div styleName='sell' className='container'>
      <h1>Verkaufen</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
	return {
		accessToken: state.app.authentication.accessToken.token
	};
}

export default connect(mapStateToProps)(CSSModules(Sell, styles));
