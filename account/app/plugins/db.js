var db = require('@nodedk/db')

module.exports = function (app) {
  return db(app.config.db)
}
