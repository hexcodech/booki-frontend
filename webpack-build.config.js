const path = require("path");
const webpack = require("webpack");
const context = path.resolve(__dirname);

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

module.exports = {
	devtool: "cheap-module-source-map",

	entry: [path.join(__dirname, "web/main.jsx")],

	output: {
		path: path.join(__dirname, "build/js/"),
		filename: "bundle.js",
		publicPath: "/js/"
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin(), //minify everything
		new webpack.optimize.AggressiveMergingPlugin() //Merge chunks
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
				include: [
					path.resolve(__dirname, "app"),
					path.resolve(__dirname, "web"),
					path.resolve(__dirname, "node_modules", "booki-frontend-core"),
					path.resolve(__dirname, "node_modules", "react-icons")
				],

				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["es2015", "es2016", "es2017", "react"],
							plugins: [
								"transform-object-rest-spread",
								"transform-class-properties",
								[
									"react-css-modules",
									{
										filetypes: {
											".scss": {
												syntax: "postcss-scss"
											}
										},
										context: context,
										webpackHotModuleReloading: false
									}
								]
							]
						}
					}
				]
			},
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, "web")],

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
				include: [path.resolve(__dirname, "web")],

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
