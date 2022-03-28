const {
  webpack,
  path,
  MiniCssExtractPlugin,
  CleanWebpackPlugin,
  HtmlWebpackPlugin,
} = require('./webpack/HelperModule')

const Dotenv = require('dotenv-webpack')
const resolve = require('resolve')
const CopyPlugin = require('copy-webpack-plugin')
const postcssNormalize = require('postcss-normalize')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin')
const typescriptFormatter = require('react-dev-utils/typescriptFormatter')

const __DEV__ = process.env.NODE_ENV === 'development'
const __PROD__ = process.env.NODE_ENV === 'production'

// style files regexes
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/

// Build path for React SPA
const outputDirectoryName = 'app'
const buildDirectoryName = 'build'

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    __DEV__ && require.resolve('style-loader'),
    __PROD__ && {
      loader: MiniCssExtractPlugin.loader,
    },
    cssOptions.modules && {
      loader: 'css-modules-typescript-loader',
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            postcssNormalize(),
          ],
          sourceMap: __DEV__,
        },
      },
    },
  ].filter(Boolean)
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: __DEV__,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: __DEV__,
        },
      },
    )
  }
  return loaders
}

module.exports = {
  entry: {
    bundle: ['./src/index.tsx'],
  },
  // https://webpack.js.org/configuration/performance/#performance-maxentrypointsize
  performance: {
    hints: 'warning', // 'false | wanrning | error '
    maxAssetSize: 50000, // adjust these
    maxEntrypointSize: 7000, // adjust these
  },
  output: {
    path: path.join(process.cwd(), buildDirectoryName, outputDirectoryName),
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[name].js',
  },
  module: {
    strictExportPresence: true,
    rules: [
      //  { parser: { requireEnsure: false } },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              cache: false,
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname,
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: path.join(process.cwd(), 'src'),
      },
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: /src/,
            loader: require.resolve('babel-loader'),
            options: {
              cacheCompression: false,
              cacheDirectory: true,
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides',
              ),

              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                      },
                    },
                  },
                ],
                [
                  require.resolve('babel-plugin-styled-components'),
                  {
                    displayName: true,
                    fileName: true,
                  },
                ],
              ],
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: __DEV__,
            }),
            sideEffects: true,
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 1,
                sourceMap: __DEV__,
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              null,
            ),
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              'file-loader?name=assets/img/[sha512:hash:base64:7].[ext]',
              {
                loader: 'image-webpack-loader',
                options: {
                  query: {
                    gifsicle: {
                      interlaced: false,
                    },
                    optipng: {
                      optimizationLevel: 7,
                    },
                  },
                },
              },
            ],
          },
          {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'assets/fonts/',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '' }],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          title: 'Test Site',
          template: './src/index.html',
          favicon: './src/favicon.ico',
        },
        __PROD__
          ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
          : undefined,
      ),
    ),
    new ModuleNotFoundPlugin('./'),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: 'assets/css/[name].css',
      ignoreOrder: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__,
      __PROD__,
    }),
    new Dotenv({
      path: `./.env.${process.env.BUILD_ENV.toLowerCase()}`,
    }),
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin({
      typescript: resolve.sync('typescript', {
        basedir: './node_modules',
      }),
      async: __DEV__,
      useTypescriptIncrementalApi: true,
      checkSyntacticErrors: true,
      tsconfig: './tsconfig.json',
      reportFiles: [
        '**',
        '!**/__tests__/**',
        '!**/?(*.)(spec|test).*',
        '!**/src/setupProxy.*',
        '!**/src/setupTests.*',
      ],
      silent: true,
      formatter: __PROD__ ? typescriptFormatter : undefined,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    modules: ['src', 'node_modules'],
    fallback: {
      module: false,
      dgram: false,
      dns: 'mock',
      fs: false,
      http2: false,
      net: false,
      tls: false,
      child_process: false,
    },
  },
}
