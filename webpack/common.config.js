const path = require('path');
const autoprefixer = require('autoprefixer');

// webpack plugins
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  entry: {
    'app': ['./src/index.js'],
    'vendor': ['./src/vendor.js']
  },

  resolve: {

    extensions: ['.js', '.scss'],

    modules: ['node_modules', 'src']

  },

  module: {

    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      },

      {
        test: /\.(woff|woff2)(\?[v=\d\.]+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },

      {
        test: /\.ttf(\?[v=\d\.]+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },

      {
        test: /\.eot(\?[v=\d\.]+)?$/,
        use: 'file-loader'
      },

      {
        test: /\.svg(\?[v=\d\.]+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },

      {
        test: /\.png$/,
        use: 'url-loader?limit=10240&mimetype=image/png'
      }

    ]

  },

  plugins: [
    new ProvidePlugin({
      'React': 'react'
    }),
    new CommonsChunkPlugin({
      name: ['app', 'vendor'],
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([{
      from: 'static',
      to: 'assets'
    }]),
    new LoaderOptionsPlugin({
      options: {
        context: '/',
        sassLoader: {
          includePaths: [path.resolve(__dirname, '../src')]
        },
        postcss: function () {
          return [autoprefixer];
        }
      }
    })
  ],

  node: {
    global: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};