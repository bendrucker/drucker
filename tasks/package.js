'use strict'

const pick = require('lodash.pick')
const promisify = require('pify')
const writeFile = promisify(require('fs').writeFile)

module.exports = writePackage

async function writePackage ({author, cli, ...data}, options) {
  const pkg = pick(data, [
    'name',
    'description',
    'license',
    'keywords'
  ])

  Object.assign(pkg, {
    main: './index.js',
    bin: !cli
      ? undefined
      : {[cli]: './cli.js'},
    author: pick(author, [
      'name',
      'email',
      'url'
    ]),
    files: [
      '*.js'
    ],
    scripts: {
      test: 'standard && tape test.js'
    }
  })

  await writeFile('./package.json', JSON.stringify(pkg, null, 2))
}
