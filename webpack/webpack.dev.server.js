const { path } = require('./HelperModule')
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')

// Genesys API
const DEV_SERVER_HOST = '0.0.0.0'
const DEV_SERVER_PORT = 3000
const buildDirectoryName = 'build'
const outputDirectoryName = 'app'

module.exports = {
  contentBase: path.join(
    process.cwd(),
    buildDirectoryName,
    outputDirectoryName,
  ),
  open: true,
  hot: true,
  host: DEV_SERVER_HOST,
  port: DEV_SERVER_PORT,
  historyApiFallback: {
    rewrites: [{ from: /\/*/, to: '/' }],
  },
  before(app, server) {
    app.use(evalSourceMapMiddleware(server))
    app.use(errorOverlayMiddleware())
    app.use(noopServiceWorkerMiddleware('')) //https://github.com/facebook/create-react-app/issues/8499
  },
  disableHostCheck: true,
}
