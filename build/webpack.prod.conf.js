// webpack.prod.conf.js
const { merge } = require('webpack-merge'); //合并
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
    mode: 'production',  //webpack4新增mode，"production" | "development" | "none"
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: true,     // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
            },
        }),
        new CleanWebpackPlugin()
    ]
});