'use strict'

const mit = require('mit')
const promisify = require('pify')
const writeFile = promisify(require('fs').writeFile)

module.exports = license

async function license ({author}, options) {
  await writeFile('./license', mit(author.name))
}
