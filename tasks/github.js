'use strict'

module.exports = createRepo

async function createRepo ({name, description, keywords}) {
  const repo = await github.repos.create({
    name,
    description,
    homepage: `https://npmjs.com/package/${name}`,
    has_projects: false,
    has_wiki: false
  })

  await github.repos.replaceTopics({
    owner: repo.owner.login,
    repo: repo.name,
    names: keywords
  })
}
