var mail = require('@nodedk/mail')

module.exports = function (app) {
  return mail(app.config.mail)
}
