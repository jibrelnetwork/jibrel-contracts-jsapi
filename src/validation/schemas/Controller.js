/**
 * @file Exposes validation schemas for Controller interface
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Joi from 'joi-browser'

import validationRules, { generalContractKeys } from '../validationRules'

const controllerMethodKeys = Joi.object().keys({
  ...generalContractKeys,
  privateKey: validationRules.privateKey.required(),
  account: validationRules.address.required(),
  value: validationRules.value.required(),
  gasLimit: validationRules.gasLimit,
  gasPrice: validationRules.gasPrice,
  nonce: validationRules.nonce,
})

const mint = controllerMethodKeys
const burn = controllerMethodKeys

export default { mint, burn }
