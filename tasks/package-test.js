'use strict'

const test = require('blue-tape')
const tmp = require('tempy')
const promisify = require('pify')
const path = require('path')
const fs = promisify(require('fs'))
const pkg = require('./package')

test('package', async function (t) {
  const dir = tmp.directory()
  const data = {
    name: 'my-pkg',
    description: 'is great',
    license: 'MIT',
    keywords: ['foo', 'bar', 'baz'],
    author: {
      name: 'Ben Drucker',
      email: 'bvdrucker@gmail.com',
      url: 'http://bendrucker.me'
    }
  }

  await pkg(data, {cwd: dir})
  const json = await fs.readFile(path.resolve(dir, 'package.json'))
  t.deepEqual(JSON.parse(json), Object.assign({}, data, {
    main: './index.js',
    files: ['*.js'],
    scripts: {
      test: 'standard && tape test.js'
    }
  }))
})

test('package: with cli', async function (t) {
  const dir = tmp.directory()
  const data = {
    name: 'my-pkg',
    description: 'is great',
    license: 'MIT',
    keywords: ['foo', 'bar', 'baz'],
    author: {
      name: 'Ben Drucker',
      email: 'bvdrucker@gmail.com',
      url: 'http://bendrucker.me'
    },
    cli: 'my-great-bin'
  }

  await pkg(data, {cwd: dir})
  const json = await fs.readFile(path.resolve(dir, 'package.json'))
  const expected = Object.assign({}, data, {
    main: './index.js',
    bin: {
      'my-great-bin': './cli.js'
    },
    files: ['*.js'],
    scripts: {
      test: 'standard && tape test.js'
    }
  })

  delete expected.cli

  t.deepEqual(JSON.parse(json), expected)
})
