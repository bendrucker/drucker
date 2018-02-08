'use strict'

const test = require('blue-tape')
const tmp = require('tempy')
const promisify = require('pify')
const path = require('path')
const fs = promisify(require('fs'))
const source = require('./source')

test('source: index.js', async function (t) {
  const dir = tmp.directory()
  await source({main: 'fooBar'}, {cwd: dir})
  const output = await fs.readFile(path.resolve(dir, 'index.js'), 'utf8')
  t.equal(output, mainModule.trim() + '\n')
})

test('source: test.js', async function (t) {
  const dir = tmp.directory()
  await source({main: 'fooBar'}, {cwd: dir})
  const output = await fs.readFile(path.resolve(dir, 'test.js'), 'utf8')
  t.equal(output, testModule.trim() + '\n')
})

test('source: cli.js', async function (t) {
  const dir = tmp.directory()
  await source({main: 'fooBar', cli: 'my-bin'}, {cwd: dir})
  const output = await fs.readFile(path.resolve(dir, 'cli.js'), 'utf8')
  t.equal(output, cliModule.trim() + '\n')
})

const mainModule = `
'use strict'

module.exports = fooBar

function fooBar () {

}
`

const testModule = `
'use strict'

const test = require('tape')
const fooBar = require('./')

test(function () {

})
`

const cliModule = `
#!/usr/bin/env node

'use strict'

const meow = require('meow')
const fooBar = require('./')

const cli = meow(\`\`)
`
