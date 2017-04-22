import React
       from 'react';
import {connect}
       from 'react-redux';
import {push}
       from 'react-router-redux';

import {getParameterByName}
       from 'core/utilities/location';

import {fetchAuthUser, receiveAccessToken}
       from 'core/actions/auth';

import Spinner
       from 'web/components/Spinner';

class OAuthCallback extends React.Component{

	componentDidMount(){

		const	token     = getParameterByName('token'),
		      clientId	= getParameterByName('clientId'),
		      userId    = getParameterByName('userId'),
		      expires		= getParameterByName('expires');

		const accessToken = {
			token,
			clientId,
			userId,
			expires
		};

		this.props.dispatch(
			receiveAccessToken(accessToken)
		);

		this.props.dispatch(
			fetchAuthUser(accessToken.token)
		).then(() => {
			this.props.dispatch(
				push('/dashboard/')
			);
		});
	}


	render(){
		return (
      <Spinner />
		);
	}

};

export default connect()(OAuthCallback);
