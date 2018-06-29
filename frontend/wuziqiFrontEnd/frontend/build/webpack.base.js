const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: {
        index:'./src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            extractCSS: true,
                            loaders: {
                                js: 'babel-loader?presets[]=env'
                            }
                        }
                    }
                ]
            }, {
                test: /\.js$/,
                include: /(src|node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            }, {
                test: /\.(png|gif|jpeg|jpg)$/,
                use: 'file-loader?name=images/[name]_[hash:8].[ext]&publicPath=../'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
                    "css-loader"
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'all',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10    
                },
                manifest: { // 抽离自己写的公共代码，utils这个名字可以随意起
                    chunks: 'all',
                    name: 'manifest',  // 任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    resolve: { alias: { 'vue': 'vue/dist/vue.js' } },
    plugins: [
       
        // new ExtractTextPlugin('styles/[name]_[contenthash:8].css'),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "styles/[name]_[contenthash:8].css",
        chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['vendor','manifest', 'index']
        }),
		
        // new InlineManifestWebpackPlugin({
        //     name: 'webpackManifest'
        // })
    ]
};