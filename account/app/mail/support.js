module.exports = function ($, { content }) {
  return `
      ${content}
      ${(function () {
        if ($.account) {
          return `
            account: ${$.account?.name || 'no name'} (${
            $.account?.email || 'no email'
          })
          `
        }
        return ''
      })()}
    `
}
