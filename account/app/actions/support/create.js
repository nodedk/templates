module.exports = async function ($) {
  await $.validate({
    values: {
      email: {
        is: '$email',
        required: true
      },
      subject: {
        minlength: 3,
        required: true
      },
      content: {
        minlength: 3,
        required: true
      }
    }
  })
  var { values = {} } = $.params
  var { email, subject, content } = values
  if (process.env.NODE_ENV != 'test') {
    $.mailer.send({
      text: $.app.mail.support($, { content }),
      subject,
      to: email,
      from: $.app.config.env.email
    })
  }
  return await $.db('support').create(values)
}
