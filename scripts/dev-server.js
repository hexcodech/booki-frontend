const apiConfig = require("../config.json");
//this can't be read by the client (btw this is just a local dev secret
const CLIENT_SECRET = "LSrPC7eMrZBUDOy6rJrZCl6xOm60U/";

const path = require("path");
const webpack = require("webpack");
const express = require("express");
const request = require("request");
const config = require("../webpack.config");

const app = express();
const compiler = webpack(config);

app.use(
	require("webpack-dev-middleware")(compiler, {
		publicPath: config.output.publicPath
	})
);

app.use(require("webpack-hot-middleware")(compiler));

app.use("/css", express.static(path.resolve(__dirname, "../web/css")));
app.use("/img", express.static(path.resolve(__dirname, "../web/img")));
app.use("/js", express.static(path.resolve(__dirname, "../web/js")));

app.get("/oauth-callback", (req, response) => {
	if (!req.query.code) {
		return response.redirect("/");
	}

	request(
		{
			url: apiConfig.API_URL + "/oauth2/token",
			method: "POST",
			json: {
				clientId: apiConfig.CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				code: req.query.code,
				grant_type: "authorization_code"
			}
		},
		(error, resp, body) => {
			if (!error && response.statusCode === 200) {
				let token;

				try {
					if (typeof token === "string") {
						token = JSON.parse(body);
					} else {
						token = body.access_token;
					}
				} catch (e) {
					console.log("JSON parsing error!", body, e);

					return response.redirect("/?error=true");
				}

				return response.redirect(
					"/auth/callback?" +
						"token=" +
						token.token +
						"&" +
						"clientId=" +
						token.clientId +
						"&" +
						"userId=" +
						token.userId +
						"&" +
						"expires=" +
						token.expires +
						"&"
				);
			} else {
				console.log("error: " + error);
				console.log("response.statusCode: " + response.statusCode);
				console.log("response.statusText: " + response.statusText);
				console.log("redirecting to / ...");

				return response.redirect("/?error=true");
			}
		}
	);
});

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../web/index.html"));
});

app.listen(8102, err => {
	if (err) {
		return console.error(err);
	}

	console.log("Listening at http://localhost:8102/");
});
