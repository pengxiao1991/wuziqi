const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
module.exports = webpackMerge(commonConfig, {
    mode:'development',
    output: {
        filename: 'scripts/[name]_[hash:8].js',
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true
    }
});