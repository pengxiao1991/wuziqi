const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const commonConfig = require('./webpack.base.js');

module.exports = webpackMerge(commonConfig, {
	mode:'production',
	output: {
		path: path.join(__dirname, './dist/'),
		filename: 'scripts/[name]_[chunkhash:8].js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.join(__dirname, './')
		}),
		// 完全压缩公共模块，独立模块只做基本压缩（方便调试）
		new webpack.optimize.UglifyJsPlugin()
	]
});