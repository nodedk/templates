var { esc } = require('@nodedk/element')

module.exports = function ($) {
  return /* HTML */ `
    <div id="menu">
      <a
        id="toggler"
        onclick="handleToggleMenu()"
        href="javascript:void(0)"
        data-toggle="#main-menu"
      >
        Menu
      </a>
      <div id="main-menu">
        ${(function () {
          if ($.account) {
            return /* HTML */ `
              <a href="${$.link('profile')}">Profile</a>
              <a href="${$.link('account')}">Account</a>
              <a href="${$.link('logout')}">Logout</a>
            `
          }
          return /* HTML */ `
            <a href="${$.link('login')}">Login</a>
            <a href="${$.link('signup')}">Signup</a>
          `
        })()}
      </div>
    </div>
  `
}
