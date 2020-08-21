// webpack.base.conf.js
const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');

const APP_PATH = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
    entry: {
        app: './src/index.tsx'
    },
    output: {
        filename: "js/[name].[chunkhash].js",
        path: DIST_PATH
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [{ 
            test: /\.tsx?$/, 
            loader: "awesome-typescript-loader",
            options: {
                transpileOnly: false,//（可选）
                getCustomTransformers: () => ({
                  before: [
                    tsImportPluginFactory({
                        libraryDirectory: 'es',
                        libraryName: 'antd',
                        style: true
                    })
                  ]
                })
            }
        },{
            test: /\.js?$/,    //对于js使用babel编译成es5
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            include: APP_PATH
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader',],
        }, {
            test: /\.less$/,
            exclude: [/node_modules/],
            use: [
                { loader: "style-loader" },
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 1,
                        modules: {
                            mode: 'local',
                            localIdentName: '[local]--[hash:base64:5]',
                        },
                    }
                },
                {
                    loader: "postcss-loader",//自动加前缀
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                overrideBrowserslist: ['last 10 version']
                            })
                        ]
                    }
                },
                {
                    loader: "less-loader", options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    }
                }
            ]
        }, {
            test: /\.less$/,
            include: [/node_modules/],
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                {
                    loader: "postcss-loader",//自动加前缀
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                overrideBrowserslist: ['last 10 version']
                            })
                        ]
                    }
                },
                {
                    loader: "less-loader", options: {
                        lessOptions: {
                            javascriptEnabled: true
                        }
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    publicPath: '/',
                    name: "images/[name].[ext]",
                    limit: 1000
                }
            }]
        }, {
            test: /\.(woff|svg|eot|woff2|tff)$/,
            use: 'url-loader',
            exclude: /node_modules/
        }]
    }
};