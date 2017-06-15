/**
 * Created by manojmali1 on 10/06/17.
 */

'use strict'

const hapi = require('hapi')
const aerospike = require('aerospike')
const promise = require('bluebird')
const hapiSpike = require('./index')

const hosts = [{addr: 'aerospike-qa-1.crowdfireapp.com', port: 3000}]

const client = promise.promisifyAll(aerospike.client({
  hosts: hosts,
  policies: {
    timeout: 10000
  }
}))

const server = new hapi.Server()

server.connection({
  port: 9090
})

hapiSpike.getAerospikeEndpoints(server, '', client)

client.connectAsync().then(function (res) {
  //start the server
  server.start(function () {
    console.log('Hapi-spike: server started')
  })
}).catch(function (err) {
  console.log(err)
})




