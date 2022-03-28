const mb = require('mountebank')
const settings = require('./settings')
const apiService = require('./api-service')

const mbServerInstance = mb.create({
  port: settings.port,
  pidfile: 'api/logs/mb.pid',
  logfile: 'api/logs/mb.log',
  protofile: './protofile.json',
  ipWhitelist: ['*'],
  allowInjection: true,
})

mbServerInstance.then(function () {
  apiService.addService()
})
