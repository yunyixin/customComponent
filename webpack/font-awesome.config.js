/**
 * Configuration file for font-awesome-webpack
 *
 * In order to keep the bundle size low in production,
 * disable components you don't use.
 *
 */

module.exports = {
  // styleLoader: require('extract-text-webpack-plugin').extract({
  //   fallback: 'style-loader',
  //   use: 'css-loader!less-loader'
  // }),
  styles: {
    mixins: false,
    core: true,
    icons: true,
    larger: true,
    path: true,
    animated: true
  }
};
