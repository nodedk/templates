var { esc } = require('@nodedk/element')

module.exports = function avatar({ image, name, color }, opt = {}) {
  if (!opt.size) opt.size = ''
  return /* HTML */ `
    <div class="tag-avatar">
      ${(function () {
        if (image) {
          return /* HTML */ ` <img class="${opt.size}" src="${esc(image)}" /> `
        }

        var initials = name
          .split(' ')
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
          .toUpperCase()

        return /* HTML */ `
          <span
            class="initials ${opt.size}"
            ${color ? ` style="background:${color}"` : ''}
            >${initials}</span
          >
        `
      })()}
    </div>
  `
}
