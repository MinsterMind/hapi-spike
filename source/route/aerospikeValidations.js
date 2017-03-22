/**
 * Created by manojmali1 on 03/03/17.
 */

'use strict'

const joi = require('joi')

module.exports = {
  getSets: {
    query: {
      namespace: joi.string().required()
    },
    options: {
      allowUnknown: true
    }
  },

  getRecord: {
    query: {
      namespace: joi.string().required(),
      set: joi.string().required(),
      key: joi.string().required()
    },
    options: {
      allowUnknown: true
    }
  }
}