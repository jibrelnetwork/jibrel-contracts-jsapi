/**
 * @file Exposes validation schemas for ERC20 interface
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Joi from 'joi-browser'

import validationRules, { generalContractKeys, estimateGasKeys } from '../validationRules'

const totalSupply = Joi.object().keys(generalContractKeys)

const balanceOf = Joi.object().keys({
  ...generalContractKeys,
  owner: validationRules.address.required(),
})

const transfer = Joi.object().keys({
  ...generalContractKeys,
  privateKey: validationRules.privateKey.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
  gasLimit: validationRules.gasLimit,
  gasPrice: validationRules.gasPrice,
  nonce: validationRules.nonce,
})

const getPastEvents = Joi.object().keys({
  ...generalContractKeys,
  event: validationRules.event.required(),
  options: validationRules.eventOptions,
})

const allEvents = Joi.object().keys({
  ...generalContractKeys,
  options: validationRules.eventOptions,
  callback: validationRules.callback,
})

const Transfer = allEvents

const estimateGas = Joi.object().keys(estimateGasKeys)

export default {
  totalSupply,
  balanceOf,
  transfer,
  getPastEvents,
  allEvents,
  Transfer,
  estimateGas,
}
