'use strict'

const promisify = require('pify')
const writeFile = promisify(require('fs').writeFile)
const yaml = require('js-yaml')
const execa = require('execa')

module.exports = configureTravis

async function configureTravis ({name, author}, options) {
  await writeFile('./.travis.yml', yaml.safeDump({
    language: 'node_js',
    node_js: ['8']
  }))

  await execa('travis', ['sync', '--no-interactive'])
  await execa('travis', [
    'enable',
    '--repo',
    `${author.username}/${name}`,
    '--no-interactive'
  ])
}
