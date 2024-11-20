window.handleToggleMenu = function () {
  q('#main-menu', (el) => el.classList.toggle('open'))
}

window.handleCloseMenus = function (event) {
  event.stopPropagation()
  var el = event.target,
    toggle
  while (el) {
    if (el.classList.contains('open')) return
    var menu = el.getAttribute('data-toggle')
    if (menu) {
      toggle = q(menu)
      break
    }
    el = el.parentElement
  }
  qa('.open', (item) => {
    if (item != toggle) {
      item.classList.remove('open')
    }
  })
}

window.load = async function load(path, into) {
  var res = await fetch(path)
  res = await res.text()
  if (into) {
    var el = html(into, res)
    qa('script', el, function (script) {
      if (!script.loaded) {
        script.loaded = true
        eval(script.textContent)
      }
    })
  }
  return res
}

window.sleep = function sleep(time, s = 0.5) {
  return new Promise((r) => setTimeout(r, s * 1000))
}

window.clearErrors = function clearErrors(field) {
  var el = q(`.${field.name}-errors`, field.parentNode)
  if (!el) return
  el.style.opacity = 0
  setTimeout(function () {
    text(el, '')
    el.style.opacity = 1
  }, 210)
}

window.showErrors = function showErrors(result, options = {}) {
  if (!result.error) return
  options = Object.assign({ class: 'error' }, options)
  qa('form em', function (el) {
    text(el, '')
  })
  flash(result.error.message, options)
  for (var key in result) {
    if (key !== 'error') {
      for (var field in result[key]) {
        text(`.${field}-errors`, result[key][field][0])
      }
    }
  }
  return true
}

window.navCount = function navCount(add) {
  if (!add) {
    store('root', null)
    store('last', null)
    return
  }
  var path = location.pathname
  var last = store('last')
  if (!last || last != path) {
    store('root', (store('root') || 0) + 1)
  }
  store('last', path)
}

window.isImage = function isImage(name) {
  return /\.(gif|jpe?g|tiff|png|bmp|svg)$/i.test(name)
}

window.closeWindow = function closeWindow(e) {
  if (e.code == 'Escape') {
    goBack()
  }
}

window.tr = function tr(str = '', size = 32) {
  return str.length > size ? str.substring(0, size).trim() + ' ...' : str
}

window.toggleVisibility = function toggleVisibility(options = {}, fn) {
  var pub = options.pub || 'public'
  var priv = options.priv || 'private'
  var selector = '.' + pub + ',.' + priv
  var session = cookie(options.cookie || 'session')
  var toggle =
    fn ||
    function (el) {
      var isPublic = el.classList.contains(pub)
      var isPrivate = el.classList.contains(priv)
      if ((session && isPublic) || (!session && isPrivate)) {
        el.style.display = 'none'
      }
    }
  document.querySelectorAll(selector).forEach(toggle)
}

window.setActiveLink = function setActiveLink(options = {}) {
  document.querySelectorAll(options.selector || 'a').forEach(function (el) {
    if (el.pathname == location.pathname) {
      el.classList.add(options.active || 'active')
    }
  })
}

window.handleLogout = function handleLogout(options = {}, fn) {
  var name = options.cookie || 'session'
  if (cookie(name)) cookie(name, null)
  if (fn) fn()
}

window.handleDropdownOpen = function handleDropdownOpen(a) {
  a.classList.toggle('toggle-open')
  q('#main-menu', (el) => el.classList.toggle('toggle-open'))
}

window.handleDropdownBlur = function handleDropdownBlur(opt = {}) {
  if (!opt.toggler) opt.toggler = 'toggle-open'
  if (!opt.ref) opt.ref = 'data-toggle'

  document.addEventListener('click', function (e) {
    e.stopPropagation()
    var el = e.target,
      toggle

    while (el) {
      if (el.classList.contains(opt.toggler)) return
      var ref = el.getAttribute(opt.ref)
      if (ref) {
        toggle = q(ref)
        break
      }
      el = el.parentElement
    }
    qa(`.${opt.toggler}`, (item) => {
      if (item != toggle) {
        item.classList.remove(opt.toggler)
      }
    })
  })
}

window.back = function back() {
  history.go(-(store('root') || 1))
}

window.goBack = function goBack() {
  if (store('origin')) {
    return (location = store('origin'))
  }
  location = '/'
}

window.openModal = async function openModal(el, fn) {
  // Disable scroll
  window.scrollPosition = window.scrollY
  document.body.classList.add('modal-open')

  // Find modal element
  var name = typeof el == 'string' ? el : el.getAttribute('data-modal')
  var modal = document.querySelector(name || '.modal')
  if (!modal) return
  modal.style.display = 'block'
  modal.classList.add('modal-current')

  // Load from DOM
  var source = el.getAttribute('data-source')
  if (source) {
    var node = document.querySelector(source)
    var layout = el.getAttribute('modal-layout') || '.modal-layout'
    var frame = document.querySelector(layout)
    var current = frame.cloneNode(true)
    current.classList.add('modal-current')
    var content = current.querySelector('.modal-content')
    content.appendChild(node.firstElementChild)
    modal.appendChild(current.firstElementChild)
    window.modalSource = node
  } else {
    delete window.modalSource
  }

  // Load content
  var href = el.getAttribute('data-href') || el.href
  if (href) {
    var content = ''
    try {
      content = await fetch(href)
      content = await content.text()
    } catch (e) {}
    modal.innerHTML = content
  }

  // Set title
  var text = el.getAttribute('data-title')
  if (text) {
    var title = modal.querySelector('.modal-title')
    if (title) title.innerHTML = text
  }

  // Load scripts
  var scripts = modal.querySelectorAll('script')
  scripts.forEach(function (script) {
    if (!script.loaded) {
      script.loaded = true
      eval(script.textContent)
    }
  })

  // Scroll background
  window.scrollTo(0, window.scrollPosition)

  // Run callback function
  if (typeof fn == 'function') {
    await fn()
  }
}

window.closeModal = function closeModal(el) {
  // Find modal element
  var name = typeof el == 'string' ? el : el.getAttribute('data-modal')
  var modal = document.querySelector(name || '.modal')
  if (!modal) return

  // Move content back to source
  var node = window.modalSource
  if (node) {
    var content = modal.querySelector('.modal-content')
    node.appendChild(content.firstElementChild)
  }
  delete window.modalSource

  // Reset content
  modal.style.display = 'none'
  modal.textContent = ''
  modal.classList.remove('modal-current')

  // Enable scroll
  document.body.classList.remove('modal-open')
  if (window.scrollPosition) {
    window.scrollTo(0, window.scrollPosition)
  }
}

window.saveFile = function saveFile(link) {
  var url = link.href
  var filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0]
  var xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = function () {
    var a = document.createElement('a')
    a.href = window.URL.createObjectURL(xhr.response)
    a.download = filename
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
  xhr.open('GET', url)
  xhr.send()
}

window.download = function download(blob, filename) {
  var url = URL.createObjectURL(blob)
  var a = document.createElement('a')
  a.href = url
  a.download = filename || 'download'

  function handleClick() {
    setTimeout(function () {
      URL.revokeObjectURL(url)
      a.removeEventListener('click', handleClick)
    }, 150)
  }

  a.addEventListener('click', handleClick, false)
  a.click()
  return a
}

window.copy = function copy(input) {
  if (typeof input == 'string') {
    input = document.querySelector(input)
  }
  input.select()
  input.setSelectionRange(0, 99999)

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(input.value)
  } else if (typeof document.execCommand == 'function') {
    document.execCommand('copy')
  }
}

window.showInfo = function showInfo(el) {
  var selector = el.getAttribute('data-toggle')
  q(selector).classList.toggle('toggle-open')
}
