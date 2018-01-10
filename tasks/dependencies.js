'use strict'

const execa = require('execa')

module.exports = installDependencies

async function installDependencies ({cli}) {
  const dependencies = [
    'tape',
    'standard',
    cli && 'meow'
  ]
  .filter(Boolean)

  return execa('npm', [
    'install',
    '--save-dev',
    '--save-prefix=^',
    ...dependencies
  ])
}
