import React
       from 'react';
import {API_URL, CLIENT_ID, REDIRECT_URI}
       from 'config.json';

import CSSModules
       from 'react-css-modules';
import styles
       from './Login.scss';

const Login = () => {

	let width  = window.innerWidth ||
	             document.documentElement.clientWidth		||
						   document.body.clientWidth;
	let height = window.innerHeight	||
	             document.documentElement.clientHeight ||
							 document.body.clientHeight;

	let bgStyles = {
		background: 'linear-gradient(' +
			'rgba(255, 173, 57, 0.45), rgba(255, 173, 57, 0.45)' +
		'),' +
		'url(https://source.unsplash.com/random/' + width+'x'+height + '/weekly/)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover'
	};

	return (
		<div style={bgStyles} styleName='login'>
			<div className='row'>
				<div
          className='col-xs-12 col-sm-6 col-lg-4 offset-sm-3 offset-lg-4'
          styleName='modal'
        >
					<section styleName='wrapper'>
						<h1>Booki Dashboard</h1>
						<a
              href={API_URL + '/oauth2/authorize?client_id=' + CLIENT_ID +
              '&response_type=code&redirect_uri=' + REDIRECT_URI}
              styleName='button'
            >
							Login
						</a>
					</section>
				</div>
			</div>
		</div>
	);
};

export default CSSModules(Login, styles);
