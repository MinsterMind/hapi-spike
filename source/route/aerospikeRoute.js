/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'

const aerospikeHandler = require('../handler/aerospikeHandler')
const validations = require('./aerospikeValidations')
const co = require('co')

const getRoutes = function (prefixPath) {
  return [
    {
      method: 'GET',
      path: `${prefixPath}/aerospike/namespaces`,
      handler: co.wrap(aerospikeHandler.getNameSpaces)
    },
    {
      method: 'GET',
      path: `${prefixPath}/aerospike/sets`,
      handler: co.wrap(aerospikeHandler.getSets),
      config: {
        validate: validations.getSets
      }
    },
    {
      method: 'GET',
      path: `${prefixPath}/aerospike/record`,
      handler: co.wrap(aerospikeHandler.getRecord),
      config: {
        validate: validations.getRecord
      }
    },
    {
      method: 'GET',
      path: `${prefixPath}/aerospike/admin-panel`,
      handler: {
        view: {
          template: 'aerospike',
          context: {
            namespaceurl: `${prefixPath}/aerospike/namespaces`,
            seturl: `${prefixPath}/aerospike/sets`,
            recordurl: `${prefixPath}/aerospike/record`
          }
        }
      }//co.wrap(aerospikeHandler.adminPanel),
    }
  ]
}

module.exports = {
  getRoutes
}
