/**
 * @file Manages function, that used to validate API function input params
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Promise from 'bluebird'
import Joi from 'joi-browser'

import schemas from './schemas'

/**
 * @async
 * @function validate
 *
 * @description Validates input parameters by schema
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {string} payload.interfaceName - Interface name
 * @param {string} payload.method - API function name
 * @param {array} payload.args - API function arguments
 *
 * @returns Promise that will be resolved with received payload comprising validated properties
 */
export default function validate(payload) {
  const { props, interfaceName, method, args } = payload

  const schema = getSchema(interfaceName, method)

  return new Promise((resolve, reject) => {
    return Joi.validate(props, schema, (err, result) => {
      if (err) {
        return reject(err)
      }

      return resolve({ interfaceName, method, args, props: result })
    })
  }).catch((err) => {
    throw (new Error(err))
  })
}

function getSchema(interfaceName, method) {
  const interfaceSchemas = schemas[interfaceName]

  if (!interfaceSchemas) {
    Promise.reject(new Error(`Validation schemas for ${interfaceName} not found`))
  }

  const methodSchema = interfaceSchemas[method]

  if (!methodSchema) {
    Promise.reject(new Error(`Validation schema for ${interfaceName}.${method} not found`))
  }

  return methodSchema
}
