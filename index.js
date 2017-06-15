/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'
const path = require('path')
const aerospikeModel = require('./source/model/aerospike')
const aerospikeRoutes = require('./source/route/aerospikeRoute')

/**
 * creates the aerospike specific endpoints which can be added to hapi server
 * @param prefixPath
 * @param aerospikeClient
 */
const getAerospikeEndpoints = function (hapiServer, prefixPath, aerospikeClient) {
  if (aerospikeClient) {
    aerospikeModel.setAerospikeClient(aerospikeClient)
  } else {
    aerospikeModel.connect()
  }

  hapiServer.register(require('vision'), function (err) {
    hapiServer.views({
      engines: {
        html: require('handlebars')
      },
      relativeTo: path.resolve(__dirname, './source'),
      path: 'views'
    })

    hapiServer.route(aerospikeRoutes.getRoutes(prefixPath))
  })

}


module.exports = {
  getAerospikeEndpoints
}
