/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'

const boom = require('boom')
const fs = require('fs')

const aerospike = require('../model/aerospike')

const getNameSpaces = function* (req, res) {
  try {
    const namespaces = yield aerospike.getNameSpaces()
    res(namespaces)
  } catch (ex) {
    res(boom.wrap(ex, 400, ex.message))
  }
}

const getSets = function* (req, res) {
  try {
    const namespace = req.query.namespace
    const sets = yield aerospike.getSets(namespace)
    res(sets)
  } catch (ex) {
    res(boom.wrap(ex, 400, ex.message))
  }
}

const getRecord = function* (req, res) {
  try {
    const namespace = req.query.namespace
    const set = req.query.set
    const key = req.query.key
    const record = yield aerospike.getRecord(namespace,set, key)
    res(record)
  } catch (ex) {
    res(boom.wrap(ex, 400, ex.message))
  }
}

const adminPanel = function* (req, res) {
  try {
    res.view('aerospike')
  } catch (ex) {
    res(boom.wrap(ex, 400, ex.message))
  }
}


module.exports = {
  getNameSpaces,
  getSets,
  getRecord,
  adminPanel
}
