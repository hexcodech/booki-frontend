const apiConfig		= require('../config.json');
//this can't be read by the client (btw this is just a local dev secret
const CLIENT_SECRET	= 'jbRA3q/ibi6A0FS4yL7sV3UAf6rtjO';

const path      = require('path');
const express   = require('express');
const request   = require('request');

const app       = express();

app.use('/css', express.static(path.join(__dirname, '../web/css')));
app.use('/img', express.static(path.join(__dirname, '../web/img')));
app.use('/js', express.static(path.join(__dirname, '../web/js')));
app.use('/build/', express.static(path.join(__dirname, '../build/')));

app.get('/oauth-callback', (req, response) => {

	if(!req.query.code){return response.redirect('/');}

	request({
	    url       : apiConfig.API_URL + '/oauth2/token',
	    method    : 'POST',
	    json      : {
		    clientId      : apiConfig.CLIENT_ID,
		    clientSecret  : CLIENT_SECRET,
		    code          : req.query.code,
		    grant_type    : 'authorization_code'
	    }
	}, (error, resp, body) => {
		if (!error && response.statusCode === 200) {

			let token;

			try{

				if(typeof token === 'string'){
					token = JSON.parse(body).access_token;
				}else{
					token = body.access_token;
				}

			}catch(e){
				console.log('JSON parsing error!', body, e);

				return response.redirect('/?error=true');
			}

			return response.redirect(
				'/auth/callback?'
				+ 'token='		+ token.token			  + '&'
				+ 'clientId='	+ token.clientId		+ '&'
				+ 'userId='		+ token.userId			+ '&'
				+ 'expires='  + token.expires     + '&'
			);
		}else {
			console.log('error: ' + error);
			console.log('response.statusCode: ' + response.statusCode);
			console.log('response.statusText: ' + response.statusText);
			console.log('redirecting to / ...');

			return response.redirect('/?error=true');
		}
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../web/index.html'));
});

app.listen(8080, (err) => {
	if (err) {
		return console.error(err);
	}

	console.log('Listening at http://localhost:8080/');
});
