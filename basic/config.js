module.exports = async function () {
  var port = 51343

  var host = `https://localhost:${port}`

  if (process.env.NODE_ENV == 'production') {
    host = 'https://website.com'
  }

  return {
    env: { host },
    options: { port, compile: true },
    bundle: {
      css: ['/css/base.css', '/css/app.css'],
      js: ['/js/client.js', '/js/element.js', '/js/window.js', '/js/app.js']
    },
    deploy: {
      domains: 'ndk.sh',
      proxy: `http://localhost:${port}`,
      ssr: true
    },
    sitemap: {
      hostname: 'https://ndk.sh',
      urls: [
        {
          url: '/',
          changefreq: 'monthly',
          priority: 0.9
        },
        {
          url: '/about',
          changefreq: 'monthly',
          priority: 0.5
        }
      ]
    }
  }
}
