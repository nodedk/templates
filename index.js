#!/usr/bin/env node

var tools = require('@nodedk/tools')
var path = require('node:path')

async function askTemplate() {
  console.log(
    '\nSelect template:\n\n1. Basic app\n2. With login and account management\n'
  )

  var template = await tools.ask('> ')

  if (template == '1') {
    return 'basic'
  } else if (template == '2') {
    return 'account'
  }

  console.log('Unknown template: ', template)
}

async function main() {
  console.log('\nWhat is the name of your app?')
  var name = await tools.ask('> ')
  name = name.replace(/ /g, '-').trim()

  var template
  do {
    template = await askTemplate()
  } while (!template)

  var root = process.cwd()
  var source = path.join(__dirname, template)
  var target = path.join(root, name)

  if (await tools.exist(target)) {
    console.log(
      `\nTarget directory ${name} already exists.\n\nDo you want to delete it?`
    )
    var rm = await tools.ask('[y/N]')
    if (rm != 'y') {
      console.log(`Aborting.`)
      process.exit()
    }
    console.log(`\nDeleting existing ${name}...`)

    await tools.cap(`rm -rf ${target}`)
  }

  console.log(
    `\nInstalling ${template} template.\nCopying files into ${name}...`
  )

  await tools.cap(`cp -rv ${source} ${target}`)

  process.chdir(target)

  console.log('\nInstalling packages, please wait...\n')
  await tools.run('npm install')

  console.log(`\nNodeDK app created, now do:\n`)
  if (name != '.') {
    console.log(`cd ${name}`)
  }

  process.exit()
}

main()
