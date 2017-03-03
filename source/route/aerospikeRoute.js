/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'

const aerospikeHandler = require('../handler/aerospikeHandler')
const validations = require('./aerospikeValidations')
const co = require('co')

const getRoutes = function (prefixPath) {
  const routes = [
    {
      method: 'GET',
      path: `${prefixPath}/aerospike/namespaces`,
      handler: co.wrap(aerospikeHandler.getNameSpaces)
    },
    {
      method: 'GET',
      path: `${prefixPath}/aerospike/sets`,
      handler: co.wrap(aerospikeHandler.getSets)
    },
    {
      method: 'GET',
      path: `${prefixPath}/aerospike/record`,
      handler: co.wrap(aerospikeHandler.getRecord)
    }
  ]

  return routes
}

module.exports = {
  getRoutes
}