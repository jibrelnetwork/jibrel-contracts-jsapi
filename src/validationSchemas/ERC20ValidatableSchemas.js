import Joi from 'joi-browser'

import validationRules, { generalKeys } from './validationRules'

const isRegulated = Joi.object().keys(generalKeys)

const isReceivingAllowed = Joi.object().keys({
  ...generalKeys,
  account: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isSpendingAllowed = isReceivingAllowed

const isTransferAllowed = Joi.object().keys({
  ...generalKeys,
  from: validationRules.address.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isApproveAllowed = Joi.object().keys({
  ...generalKeys,
  from: validationRules.address.required(),
  spender: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isApprovedSpendingAllowed = isApproveAllowed

const isTransferFromAllowed = Joi.object().keys({
  ...generalKeys,
  spender: validationRules.address.required(),
  from: validationRules.address.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
})

const estimateGas = Joi.object().keys({
  ...generalKeys,
  privateKey: validationRules.privateKey.required(),
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
