import Joi from 'joi-browser'

import validationRules from './validationRules'

const totalSupply = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
})

const balanceOf = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  owner: validationRules.address.required(),
})

const transfer = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  privateKey: validationRules.privateKey.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
  gasLimit: validationRules.gasLimit,
})

const getPastEvents = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  event: validationRules.event.required(),
  options: validationRules.eventOptions,
})

const allEvents = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  options: validationRules.eventOptions,
  callback: validationRules.callback,
})

const Transfer = allEvents

const estimateGas = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
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
