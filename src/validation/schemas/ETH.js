/**
 * @file Exposes validation schemas for ETH interface
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Joi from 'joi-browser'

import validationRules, { generalETHKeys } from '../validationRules'

const sendTransaction = Joi.object().keys({
  ...generalETHKeys,
  privateKey: validationRules.privateKey.required(),
  to: validationRules.address.required(),
  value: validationRules.value.required(),
  gasLimit: validationRules.gasLimit,
  gasPrice: validationRules.gasPrice,
  nonce: validationRules.nonce,
  data: validationRules.data,
})

const getBalance = Joi.object().keys({
  ...generalETHKeys,
  address: validationRules.address.required(),
  defaultBlock: validationRules.address,
})

const getCode = Joi.object().keys({
  ...generalETHKeys,
  address: validationRules.address.required(),
  defaultBlock: validationRules.address,
})

const getBlockNumber = Joi.object().keys({
  ...generalETHKeys,
})

const getBlock = Joi.object().keys({
  ...generalETHKeys,
  blockId: validationRules.blockId,
  returnTransactionObjects: validationRules.returnTransactionObjects,
})

const getTransaction = Joi.object().keys({
  ...generalETHKeys,
  transactionHash: validationRules.transactionHash.required(),
})

const getTransactionReceipt = Joi.object().keys({
  ...generalETHKeys,
  transactionHash: validationRules.transactionHash.required(),
})

const getLogsFilter = Joi.object().keys({
  ...generalETHKeys,
  options: validationRules.logsOptions,
})

const getPastLogs = Joi.object().keys({
  ...generalETHKeys,
  options: validationRules.logsOptions,
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
  getBlockNumber,
  getBlock,
  getCode,
  getTransaction,
  getTransactionReceipt,
  getLogsFilter,
  getPastLogs,
  estimateGas,
}
