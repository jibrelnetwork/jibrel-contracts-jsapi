import Joi from 'joi-browser'

import validationRules, { generalETHKeys } from '../validationRules'

const sendTransaction = Joi.object().keys({
  ...generalETHKeys,
  privateKey: validationRules.privateKey.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
  gasLimit: validationRules.gasLimit,
  data: validationRules.data,
})

const getBalance = Joi.object().keys({
  ...generalETHKeys,
  address: validationRules.address.required(),
  defaultBlock: validationRules.address,
})

const estimateGas = Joi.object().keys({
  ...generalETHKeys,
  to: validationRules.address.required(),
  value: validationRules.value.required(),
  data: validationRules.data,
})

export default {
  sendTransaction,
  getBalance,
  estimateGas,
}
