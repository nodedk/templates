module.exports = async function ($) {
  var host =
    process.env.NODE_ENV == 'production'
      ? 'https://waveorb.com/api'
      : 'http://localhost:5000'

  return /* HTML */ `
    <!DOCTYPE html>
    <html lang="${$.lang}">
      <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Incredible NodeDK app" />
        <title>${$.page.title || '♥'} - NodeDK app</title>
        <link rel="icon" type="image/png" href="/img/favicon.png" />
        ${$.script('/bundle.js')} ${$.style('/bundle.css')}
        <script>
          window.api = waveorb('${host}')
        </script>
        ${process.env.NODE_ENV == 'development' ? $.script('/js/dev.js') : ''}
      </head>
      <body>
        <header>
          <nav>
            <a href="${$.link('index')}">Home</a>
            <a href="${$.link('about')}">About</a>
          </nav>
        </header>
        <script>
          toggleVisibility()
          setActiveLink()
        </script>
        <div id="flash"></div>
        <main>${$.page.content}</main>
        <footer>
          With 💖 from <a href="https://eldoy.com">Eldøy Tech AS</a>
        </footer>
        <script>
          flash()
        </script>
      </body>
    </html>
  `
}
