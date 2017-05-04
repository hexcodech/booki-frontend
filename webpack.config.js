const path = require("path");
const webpack = require("webpack");

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

module.exports = {
	entry: [
		"react-hot-loader/patch",
		"webpack-hot-middleware/client",
		path.join(__dirname, "web/main.jsx")
	],

	output: {
		path: path.join(__dirname, "build/"),
		filename: "bundle.js",
		publicPath: "/build/"
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],

	resolve: {
		modules: [path.resolve(__dirname), path.resolve(__dirname, "node_modules")],

		alias: {
			core: path.resolve(__dirname, "node_modules", "booki-frontend-core")
		},

		extensions: [".js", ".jsx", ".css", ".scss"]
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules(\/|\\)(?!booki-frontend-core(\/|\\))/,

				use: [
					{
						loader: "react-hot-loader/webpack"
					},
					{
						loader: "babel-loader",
						options: {
							presets: ["es2015", "es2016", "es2017", "react"],
							plugins: [
								"transform-object-rest-spread",
								"transform-class-properties"
							]
						}
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules(\/|\\)(?!booki-frontend-core(\/|\\))/,

				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: true,
							localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
						}
					}
				]
			},
			{
				test: /\.scss$/,
				exclude: /node_modules(\/|\\)(?!booki-frontend-core(\/|\\))/,

				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: true,
							localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
						}
					},
					{
						loader: "resolve-url-loader"
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	}
};
