const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const isAnalyzer = typeof process.env.BUNDLE_ANALYZER !== 'undefined'
if (isAnalyzer) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(common, {
  mode: 'production',
  cache: {
    type: 'filesystem',
  },
  output: {
    publicPath:'/',
    pathinfo: false,
  },
  optimization: {
    minimizer: [
      (compiler) => {
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: {},
          },
        }).apply(compiler)
      },
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      name: false,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
})
