/**
 * This configuration is to minimise bundle size when using Material UI
 *
 * As recommended here: https://material-ui.com/components/icons/#usage
 * Instructions:        https://material-ui.com/guides/minimizing-bundle-size/#option-2
 */

module.exports = {
  plugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        // Use "'libraryDirectory': ''," if your bundler does not support ES modules
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ],
  presets: [
    {
      presets: ['react-app'],
    },
  ],
}
