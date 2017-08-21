const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const production = 'production' === process.env.NODE_ENV

const createEnvVarArray = () => {
    const o = {}
    ;['NODE_ENV']
        .filter(name => name in process.env)
        .forEach(name => (o[`process.env.${name}`] = `"${process.env[name]}"`))

    return o
}

module.exports = {
    entry: {
        app_original_file: ['./src/index.js', './src/index.html'],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: production ? '[hash:8].js' : '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },

            {
                test: /\.html?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].html',
                        },
                    },
                ],
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: true,
                                localIdentName: production
                                    ? '[hash:8]'
                                    : '[path][name]---[local]',
                            },
                        },
                    ],
                }),
            },

            {
                test: /\.(eot|ttf|woff|otf|woff2|svg|gif|jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:6].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        !production && new webpack.NamedModulesPlugin(),

        new ExtractTextPlugin({
            filename: production ? '[hash:8].css' : 'style_original_file.css',
            allChunks: true,
        }),

        new webpack.DefinePlugin(createEnvVarArray()),

        production && new webpack.optimize.ModuleConcatenationPlugin(),

        production &&
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                comments: false,
            }),

        // write stats
        production &&
            function() {
                this.plugin('done', stats =>
                    fs.writeFileSync(
                        path.join(__dirname, 'webpack-stats.json'),
                        JSON.stringify(stats.toJson())
                    )
                )
            },
    ].filter(Boolean),

    devtool: 'source-map',

    devServer: {
        port: 8082,
        contentBase: [path.join(__dirname, 'src')],
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/,
        },
    },
}
