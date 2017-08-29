import Joi from 'joi-browser'

import validationRules, { generalKeys } from './validationRules'

const totalSupply = Joi.object().keys(generalKeys)

const balanceOf = Joi.object().keys({
  ...generalKeys,
  owner: validationRules.address.required(),
})

const transfer = Joi.object().keys({
  ...generalKeys,
  privateKey: validationRules.privateKey.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
  gasLimit: validationRules.gasLimit,
})

const getPastEvents = Joi.object().keys({
  ...generalKeys,
  event: validationRules.event.required(),
  options: validationRules.eventOptions,
})

const allEvents = Joi.object().keys({
  ...generalKeys,
  options: validationRules.eventOptions,
  callback: validationRules.callback,
})

const Transfer = allEvents

const estimateGas = Joi.object().keys({
  ...generalKeys,
  privateKey: validationRules.privateKey.required(),
  method: validationRules.method.required(),
  args: validationRules.args.required(),
})

export default {
  totalSupply,
  balanceOf,
  transfer,
  getPastEvents,
  allEvents,
  Transfer,
  estimateGas,
}
