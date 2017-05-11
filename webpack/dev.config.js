const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./common.config');

const env = require('../env');
const autoprefixer = require('autoprefixer');

// webpack plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(webpackCommon, {

  devtool: 'inline-source-map',

  output: {

    path: path.resolve(__dirname, '../static/dist'),

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-chunk.js',

    publicPath: '/'

  },

  module: {

    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: false,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true,
              includePaths: [path.resolve(__dirname, '../src')]
            }
          }
        ]
      }
    ]

  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      },
      __ENVIRONMENT__: "'" + process.env.ENVIRONMENT + "'",
      __DEVELOPMENT__: true
    })
  ],

  devServer: {
    quiet: true,
    port: (env.devServer.port + 1) || 3001,
    host: env.devServer.host || 'localhost',
    open: false,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }

});
