'use strict'

const tree = require('require-tree')
const Listr = require('listr')

const tasks = tree('./tasks')

new Listr([
  {
    title: 'git',
    task: () => tasks.git()
  }
])
.run()
.catch(err => {
  console.error(err)
})
