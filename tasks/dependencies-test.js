'use strict'

const test = require('blue-tape')
const tmp = require('tempy')
const promisify = require('pify')
const path = require('path')
const fs = promisify(require('fs'))
const dependencies = require('./dependencies')

test('dependencies', function (t) {
  t.test('library', async function (t) {
    const dir = tmp.directory()
    const pkg = path.resolve(dir, 'package.json')

    await fs.writeFile(pkg, JSON.stringify({}))
    await dependencies({}, {cwd: dir})

    const {devDependencies} = JSON.parse(await fs.readFile(pkg))
    const packages = Object.keys(devDependencies).sort()
    const versions = Object.values(devDependencies)

    t.deepEqual(packages, [
      'standard',
      'tape'
    ])

    versions.forEach(function (version) {
      t.ok(/^\^\d/.test(version), 'save prefix is ^ in ' + version)
    })
  })

  t.test('cli', async function (t) {
    const dir = tmp.directory()
    const pkg = path.resolve(dir, 'package.json')

    await fs.writeFile(pkg, JSON.stringify({}))
    await dependencies({cli: true}, {cwd: dir})

    const {devDependencies} = JSON.parse(await fs.readFile(pkg))
    const packages = Object.keys(devDependencies).sort()
    const versions = Object.values(devDependencies)

    t.deepEqual(packages, [
      'meow',
      'standard',
      'tape'
    ])

    versions.forEach(function (version) {
      t.ok(/^\^\d/.test(version), 'save prefix is ^ in ' + version)
    })
  })
})
