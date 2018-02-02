'use strict'

const test = require('blue-tape')
const tmp = require('tempy')
const promisify = require('pify')
const path = require('path')
const fs = promisify(require('fs'))
const license = require('./license')

test('license', async function (t) {
  const dir = tmp.directory()
  const author = {
    name: 'Ben Drucker',
    email: 'bvdrucker@gmail.com',
    website: 'http://bendrucker.me'
  }
  await license({author}, {cwd: dir})
  const content = await fs.readFile(path.resolve(dir, 'license'), 'utf8')
  const year = new Date().getFullYear()

  t.ok(content.startsWith('The MIT License (MIT)'), 'mit license')
  t.ok(content.includes('Copyright (c) ' + year), 'copyright')
  t.ok(content.includes('Ben Drucker <bvdrucker@gmail.com> (http://bendrucker.me)'), 'author')
})
