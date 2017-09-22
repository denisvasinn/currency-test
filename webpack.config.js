const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/pages/index-page/index-page.jsx',
    output: {
        path: path.resolve(__dirname, 'build/client'),
        filename: 'index-page.js',
        publicPath: '/'
    },
    externals: {
        React: 'react',
        ReactDom: 'react-dom'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.styl$/,
                use: ExtractTextWebpackPlugin.extract([
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: (NODE_ENV === 'production')
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'stylus-loader'
                ])
            }
        ]
    },
    plugins: [new ExtractTextWebpackPlugin('index-page.css')],
    watch: (NODE_ENV === 'development')
};