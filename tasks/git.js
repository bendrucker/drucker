'use strict'

const execa = require('execa')

module.exports = gitInit

async function gitInit () {
  await execa('git', ['init'])
}
