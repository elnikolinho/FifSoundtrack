const mbHelper = require('./mountebank-helper')
const settings = require('./settings')

// To create a new API endpoint- Add a stub in the correct feature folder
// Naming convention starts with HTTP request type; 'get' 'post' or 'put'
// Followed by name of the API and wether it is success (2XX) or failure
// Import the JSON stub and add it to the array of stubs.

const mjolApis = [
  // register user
  require('./stubs/mjol/postResgisterUser200.json'),
  require('./stubs/mjol/postResgisterUser201.json'),
  require('./stubs/mjol/postResgisterUser400.json'),
  require('./stubs/mjol/postResgisterUser500.json'),
  // member search
  require('./stubs/mjol/getMemberSearch200.json'),
  require('./stubs/mjol/getMemberSearch401.json'),
  require('./stubs/mjol/getMemberSearch404.json'),
  require('./stubs/mjol/getMemberSearch400.json'),
  require('./stubs/mjol/getMemberSearch500.json'),
]
// Data Storage APIs

function addService() {
  const stubs = [...mjolApis]

  const imposter = {
    port: settings.api_port,
    protocol: 'http',
    stubs: stubs,
    allowCORS: true,
  }

  return mbHelper.postImposter(imposter)
}

module.exports = { addService }
