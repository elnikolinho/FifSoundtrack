const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const webPackDevServerConfig = require('./webpack/webpack.dev.server')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
// uncomment below code to analize webpack bundle
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'development',
  cache: {
    type: 'filesystem',
  },
  output: {
    publicPath: '/',
    pathinfo: true,
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  devtool: 'cheap-module-source-map',
  target: 'web', // enable hot reloading
  devServer: webPackDevServerConfig,
  plugins: [
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin('./node_modules'),
    // new BundleAnalyzerPlugin(),
  ],
})
