'use strict'

const bulk = require('bulk-require')
const meow = require('meow')
const Listr = require('listr')
const path = require('path')
const assert = require('assert')

const tasks = bulk(path.resolve(__dirname, 'tasks'), [
  '*.js',
  '**/index.js'
])

console.log(tasks)

const cli = meow(`
  Usage
    $ drucker --description 'My great module' --keywords my,great,module

  Options
    --name, -n A name for the project. Defaults to the directory name.
    --description, -d, A description for the project.
    --keywords, -k Comma separated keywords.
`, {
  flags: {
    name: {
      alias: 'n'
    },
    description: {
      alias: 'd'
    },
    keywords: {
      alias: 'k'
    }
  }
})

assert(cli.flags.description, 'description is required')
assert(cli.flags.keywords, 'keywords are required')

const pkg = {
  name: cli.flags.name || path.basename(process.cwd()),
  description: cli.flags.description,
  keywords: cli.flags.keywords.split(',')
}

new Listr([
  {
    title: 'git init',
    task: tasks.git
  },
  // {
  //   title: 'github: create repo',
  //   task: () => tasks.github(pkg)
  // },
  {
    title: 'repo',
    task: () => new Listr([
      {
        title: 'package',
        task: () => tasks.package(pkg)
      },
      {
        title: 'source',
        task: () => tasks.source(pkg)
      },
      {
        title: 'readme',
        task: () => tasks.readme(pkg)
      },
      {
        title: 'license',
        task: () => tasks.license(pkg)
      },
      {
        title: 'dotfiles',
        task: () => tasks.dotfiles(pkg)
      }
    ], {concurrent: true})
  },
  {
    title: 'dependencies',
    task: () => tasks.dependencies(pkg)
  },
  // {
  //   title: 'travis',
  //   task: () => tasks.travis(pkg)
  // }
])
.run()
