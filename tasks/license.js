'use strict'

const mit = require('mit')
const promisify = require('pify')
const writeFile = promisify(require('fs').writeFile)
const path = require('path')

module.exports = license

async function license ({author}, options) {
  await writeFile(
    path.resolve(options.cwd, 'license'),
    mit(`${author.name} <${author.email}> (${author.website})`)
  )
}
