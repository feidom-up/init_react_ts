const path = require('path');
const { merge } = require('webpack-merge'); //合并
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',  //webpack4新增mode，"production" | "development" | "none"
    // 源错误检查
    devtool: 'inline-source-map',
    output: {
        filename: "js/[name].[hash].js", //热更新(HMR)不能和[chunkhash]同时使用
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: true,     // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
            },
        }),
        // 热更新
        new webpack.HotModuleReplacementPlugin(),

    ],

    devServer: {
        port: 3001,
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        hot: true, //开启
        https: false,
        noInfo: true,
        open: true,
        proxy: {}
    }
});