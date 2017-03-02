import React									from 'react';
import {connect}								from 'react-redux';
import {API_URL, CLIENT_ID, REDIRECT_URI}		from 'config.json';

const Login = () => {
	
	let width	= window.innerWidth		|| document.documentElement.clientWidth		|| document.body.clientWidth;
	let height	= window.innerHeight	|| document.documentElement.clientHeight	|| document.body.clientHeight;
	
	let bgStyles = {
		background: 'linear-gradient(rgba(255, 173, 57, 0.45), rgba(255, 173, 57, 0.45)),' + 
		'url(https://source.unsplash.com/random/' + width + 'x' + height + '/weekly/)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover'
	};
	
	return (
		<div className='wrapper' style={bgStyles}>
			<div className='row'>
				<div className='col-xs-12 col-sm-6 col-lg-4 offset-sm-3 offset-lg-4 login-modal'>
					<section className=''>
						<h1>Booki Dashboard</h1>
						<a href={API_URL + '/oauth2/authorize?client_id=' + CLIENT_ID +
							'&response_type=code&redirect_uri=' + REDIRECT_URI}
							className='btn btn-primary'>
							Login
						</a>
					</section>
				</div>
			</div>
		</div>
	);
};

export default connect()(Login);