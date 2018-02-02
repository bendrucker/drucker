'use strict'

const test = require('blue-tape')
const tmp = require('tempy')
const promisify = require('pify')
const path = require('path')
const fs = promisify(require('fs'))
const git = require('./git')

test('git', async function (t) {
  const dir = tmp.directory()
  await git({}, {cwd: dir})
  const stats = await fs.stat(path.resolve(dir, '.git'))
  t.ok(stats.isDirectory(), 'creates a .git directory')
})
