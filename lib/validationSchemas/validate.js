import Promise from 'bluebird'
import Joi from 'joi-browser'

export default function validate(props, schema) {
  return new Promise((resolve, reject) => {
    return Joi.validate(props, schema, (err, result) => {
      if (err) {
        return reject(err)
      }

      return resolve(result)
    })
  }).catch((err) => {
    throw (new Error(err))
  })
}
