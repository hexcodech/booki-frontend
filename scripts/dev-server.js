const path		= require('path');
const webpack	= require('webpack');
const express	= require('express');
const config	= require('../webpack.config');

const app		= express();
const compiler	= webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/css', express.static(path.resolve(__dirname, '../web/css')));
app.use('/img', express.static(path.resolve(__dirname, '../web/img')));
app.use('/js', express.static(path.resolve(__dirname, '../web/js')));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../web/index.html'));
});

app.listen(8080, (err) => {
	if (err) {
		return console.error(err);
	}
	
	console.log('Listening at http://localhost:8080/');
});