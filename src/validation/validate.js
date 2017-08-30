import Promise from 'bluebird'
import Joi from 'joi-browser'

import schemas from './schemas'

export default function validate({ props, interfaceName, method, args }) {
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
