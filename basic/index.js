var app = require('@nodedk/app')

module.exports = async function () {
  return await app({
    config: await require('./config.js')(),
    routes: [
      {
        name: 'home',
        paths: '/',
        handler: require('./app/pages/home.js')
      },
      {
        name: 'about',
        paths: '/about',
        handler: require('./app/pages/about.js')
      }
    ]
  })
}
