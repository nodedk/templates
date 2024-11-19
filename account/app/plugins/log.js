var logger = require('@nodedk/logger')

module.exports = async function (app) {
  if (process.env.NODE_ENV == 'production') {
    console.log = logger('../log/app.log')
    console.error = logger('../log/err.log')
  }
}
