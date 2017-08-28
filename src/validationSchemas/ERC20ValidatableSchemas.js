import Joi from 'joi-browser'

import validationRules from './validationRules'

const isRegulated = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
})

const isReceivingAllowed = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  account: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isSpendingAllowed = isReceivingAllowed

const isTransferAllowed = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  from: validationRules.address.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isApproveAllowed = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  from: validationRules.address.required(),
  spender: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isApprovedSpendingAllowed = isApproveAllowed

const isTransferFromAllowed = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  spender: validationRules.address.required(),
  from: validationRules.address.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
})

const estimateGas = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  contractAddress: validationRules.address.required(),
  method: validationRules.method.required(),
  args: validationRules.args.required(),
})

export default {
  isRegulated,
  isReceivingAllowed,
  isSpendingAllowed,
  isTransferAllowed,
  isApproveAllowed,
  isApprovedSpendingAllowed,
  isTransferFromAllowed,
  estimateGas,
}
