'use strict'

const promisify = require('pify')
const fs = promisify(require('fs'))
const {basename} = require('path')

module.exports = copyDotfiles

async function copyDotfiles () {
  const files = await fs.readdir(__dirname)
  const dotfiles = files.filter(name => basename(name) === name)

  await Promise.all(files.map(function (file) {
    const src = path.resolve(__dirname, file)
    const dest = '.' + file
    return fs.copyFile(src, dest)
  }))
}
