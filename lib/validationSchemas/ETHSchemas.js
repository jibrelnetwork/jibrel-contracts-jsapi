import Joi from 'joi-browser'

import validationRules from './validationRules'

const sendTransaction = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  privateKey: validationRules.privateKey.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
  gasLimit: validationRules.gasLimit,
  nonce: validationRules.nonce,
  data: validationRules.data,
})

const getBalance = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  address: validationRules.address.required(),
  defaultBlock: validationRules.address,
})

const estimateGas = Joi.object().keys({
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
  data: validationRules.data,
})

export default {
  sendTransaction,
  getBalance,
  estimateGas,
}
