'use strict'

const execa = require('execa')
const sshUrl = require('github-ssh-url')

module.exports = createRepo

async function createRepo ({name, description, keywords}) {
  const repo = await github.repos.create({
    name,
    description,
    homepage: `https://npmjs.com/package/${name}`,
    has_projects: false,
    has_wiki: false
  })

  await execa('git', [
    'remote',
    'add',
    'origin',
    sshUrl(repo.owner.login, repo.name)
  ])

  await github.repos.replaceTopics({
    owner: repo.owner.login,
    repo: repo.name,
    names: keywords
  })
}
