'use strict'

const filter = require('boolean-filter-obj')
const camel = require('camel-case')
const promisify = require('pify')
const writeFile = promisify(require('fs').writeFile)
const dedent = require('dedent')

module.exports = createSource

async function createSource ({name, main, cli}) {
  const files = filter({
    index: `
      module.exports = ${main}

      function ${main} () {

      }
    `,
    cli: cli && `
      const meow = require('meow')
      const ${main} = require('./')

      const cli = meow(\`\`)
    `,
    test: `
      const test = require('tape')
      const ${main} = require('./')

      test(function () {

      })
    `
  })

  await Promise.all(Object.keys(files).map(function (basename) {
    const content = [
      `'use strict'`,
      files[basename],
    ]
    .join('\n')

    return writeFile(basename + '.js', dedent(content) + '\n')
  }))
}
