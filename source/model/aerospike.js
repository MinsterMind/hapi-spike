/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'

const aerospike = require('aerospike')
const promise = require('bluebird')
const _ = require('lodash')

let client

const connect = function (host, port) {
  if(_.isEmpty(host)) {
    host = process.env.AEROSPIKE_HOST || 'localhost'
  }
  console.log(host)
  if(_.isEmpty(port)) {
    port = process.env.AEROSPIKE_PORT || 3000
  }
  const hostArray = host.split(',')
  port = parseInt(port)
  const hosts = _.map(hostArray, function (hostUrl) {
    return {
      addr: hostUrl,
      port: port}
  })
  client = promise.promisifyAll(aerospike.client({
    hosts: hosts,
    policies: {
      timeout: 100000
    }
  }))
  client.connect(function (err) {
    if(!err) {
      console.log('Hapispike connected with default configuration')
    } else {
      console.error(`Hapispike could not connect, Error: ${err}`)
    }
  })
}

/**
 * return all the namespaces available
 * @returns {Array}
 */
const getNameSpaces = function* () {
  let aerospikeInfo = yield client.infoAsync('namespaces')
  aerospikeInfo = aerospike.info.parseInfo(aerospikeInfo)
  let namespaces = []
  if(_.isArray(aerospikeInfo.namespaces)) {
    namespaces = aerospikeInfo.namespaces
  } else if(_.isString(aerospikeInfo.namespaces)) {
    namespaces = [aerospikeInfo.namespaces]
  }
  return namespaces
}

/**
 * parses the infostring and gives list of sets in aerospike
 * @param namespace
 * @param infoString
 * @private
 */
const _parseSets = function (namespace, infoString) {
  let sets = infoString.split(`${namespace}:set=`)
  sets.shift()

  if (sets.length == 0) {
    sets = infoString.split(`${namespace}:set_name=`)
    sets.shift()
  }

  return _.map(sets, function (set) {
    return set.split(':')[0]
  })

}

/**
 * return list of sets available under the provided namespace
 * @param namespace
 */
const getSets = function* (namespace) {
  let aerospikeInfo = yield client.infoAsync('sets')
  return _parseSets(namespace, aerospikeInfo)
}

/**
 * returns the record with provided key
 * @param namespace
 * @param set
 * @param key
 */
const getRecord = function* (namespace, set, key) {
  const spikeKey = aerospike.key(namespace, set, key)
  return yield client.getAsync(spikeKey)
}

/**
 * set the aerospike client as passed by the user
 * @param aerospikeClient
 */
const setAerospikeClient = function (aerospikeClient) {
  client = promise.promisifyAll(aerospikeClient)
}


module.exports = {
  connect,
  setAerospikeClient,
  getNameSpaces,
  getSets,
  getRecord
}