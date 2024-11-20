module.exports = function ($, { key }) {
  var link = `${$.app.config.env.admin}/reset?key=${key}`

  return $.app.layouts.mail(/* HTML */ `
    <h1>Reset Password</h1>
    <p>Follow this link to reset your password:</p>
    <p>
      <a href="${link}">${link}</a>
    </p>
  `)
}
