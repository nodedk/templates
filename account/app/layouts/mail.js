module.exports = function (content) {
  return /* HTML */ `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      </head>
      <body>
        ${content || ''}
      </body>
    </html>
  `
}