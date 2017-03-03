/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'
const aerospikeModel = require('./source/model/aerospike')
const aerospikeRoutes = require('./source/route/aerospikeRoute')

/**
 * creates the aerospike specific endpoints which can be added to hapi server
 * @param prefixPath
 * @param aerospikeClient
 */
const getAerospikeEndpoints = function (prefixPath, aerospikeClient) {
  if (aerospikeClient) {
    aerospikeModel.setAerospikeClient(aerospikeClient)
  } else {
    aerospikeModel.connect()
  }
  return aerospikeRoutes.getRoutes(prefixPath)
}


module.exports = {
  getAerospikeEndpoints
}
