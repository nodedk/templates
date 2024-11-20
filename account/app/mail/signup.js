module.exports = function ($) {
  return $.app.layouts.mail(/* HTML */ `
    <h1>Welcome!</h1>
    <p>
      If you have questions, please don't hesitate sending us an email on
      ${$.app.config.env.email}
    </p>
  `)
}
