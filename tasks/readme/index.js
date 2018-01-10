'use strict'

const template = require('lodash.template')
const promisify = require('pify')
const path = require('path')
const fs = promisify(require('fs'))

module.exports = writeReadme

const sections = [
  'header',
  'install',
  'usage',
  'api',
  'license'
]

async function writeReadme (data) {
  const contents = await Promise.all(sections.map(async function (section) {
    const src = path.resolve(__dirname, section + '.md')
    return template(await fs.readFile(src))(data)
  }))

  await fs.writeFile('./readme.md', contents.join('\n'))
}
