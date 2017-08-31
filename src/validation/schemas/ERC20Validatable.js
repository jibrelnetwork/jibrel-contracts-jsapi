/**
 * @file Exposes validation schemas for ERC20Validatable interface
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Joi from 'joi-browser'

import validationRules, { generalContractKeys, estimateGasKeys } from '../validationRules'

const isRegulated = Joi.object().keys(generalContractKeys)

const isReceivingAllowed = Joi.object().keys({
  ...generalContractKeys,
  account: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isSpendingAllowed = isReceivingAllowed

const isTransferAllowed = Joi.object().keys({
  ...generalContractKeys,
  from: validationRules.address.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isApproveAllowed = Joi.object().keys({
  ...generalContractKeys,
  from: validationRules.address.required(),
  spender: validationRules.address.required(),
  value: validationRules.value.required(),
})

const isApprovedSpendingAllowed = isApproveAllowed

const isTransferFromAllowed = Joi.object().keys({
  ...generalContractKeys,
  spender: validationRules.address.required(),
  from: validationRules.address.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
})

const estimateGas = Joi.object().keys(estimateGasKeys)

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
