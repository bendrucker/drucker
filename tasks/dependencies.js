'use strict'

const execa = require('execa')

module.exports = installDependencies

async function installDependencies ({cli}, options) {
  const dependencies = [
    'standard',
    'tape',
    cli && 'meow'
  ]
  .filter(Boolean)

  return execa('npm', [
    'install',
    '--save-dev',
    '--save-prefix=^',
    ...dependencies
  ], options)
}
