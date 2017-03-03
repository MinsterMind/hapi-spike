/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'
const aerospikeModel = require('./source/model/aerospike')
const aerospikeRoutes = require('./source/route/aerospikeRoute')
const promise = require('bluebird')

/**
 * creates the aerospike specific endpoints which can be added to hapi server
 * @param prefixPath
 * @param aerospikeHosts
 * @param aeropsikePort
 */
const getAerospikeEndpoints = promise.coroutine(function* (prefixPath, aerospikeHosts, aeropsikePort) {
  yield aerospikeModel.connect(aerospikeHosts, aeropsikePort)
  return aerospikeRoutes.getRoutes(prefixPath)
})

module.exports = {
  getAerospikeEndpoints
}
