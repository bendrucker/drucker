'use strict'

const filter = require('boolean-filter-obj')
const camel = require('camel-case')
const promisify = require('pify')
const path = require('path')
const writeFile = promisify(require('fs').writeFile)
const dedent = require('dedent')

module.exports = createSource

async function createSource ({main, cli}, options) {
  const files = filter({
    index: `
      'use strict'

      module.exports = ${main}

      function ${main} () {

      }
    `,
    cli: cli && `
      #!/usr/bin/env node

      'use strict'

      const meow = require('meow')
      const ${main} = require('./')

      const cli = meow(\`\`)
    `,
    test: `
      'use strict'

      const test = require('tape')
      const ${main} = require('./')

      test(function () {

      })
    `
  })

  await Promise.all(Object.keys(files).map(function (basename) {
    const content = files[basename]

    return writeFile(
      path.resolve(options.cwd, basename + '.js'),
      dedent(content) + '\n'
    )
  }))
}
