'use strict'

const execa = require('execa')

module.exports = gitInit

async function gitInit (pkg, options) {
  await execa('git', ['init'], options)
}
