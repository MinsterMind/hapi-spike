/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'

const joi = require('joi')

module.exports = {
  getSets: {
    query: {
      namespace: joi.string().required()
    }
  },

  getRecord: {
    query: {
      namespace: joi.string().required()
    }
  }
}