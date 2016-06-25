'use strict'

const Travis = require('travis-ci')
const serial = require('run-series')
const partial = require('ap').partial
const poll = require('pole')
const wait = require('pole-wait')

const travis = new Travis({
  version: '2.0.0'
})

module.exports = enableTravis

function enableTravis (data, callback) {
  serial([
    authenticate,
    sync,
    partial(enable, data)
  ], callback)
}

function authenticate (callback) {
  travis.auth.github.post({github_token: process.env.GITHUB_TOKEN}, callback)
}

function sync (callback) {
  travis.users.sync.post(function (err) {
    if (err) return callback(err)
    onNotSyncing(callback)
  })
}

function enable (data, callback) {
  travis.enable()
}

function onNotSyncing (callback) {
  const user = poll({interval: 1000}, travis.users.get)
  wait(user, (data) => !data.is_syncing, callback)
}
