var s3 = require('@nodedk/s3')

module.exports = function (app) {
  return s3(app.config.upload)
}
