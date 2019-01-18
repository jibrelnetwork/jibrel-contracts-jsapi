/**
 * @file Manages rules for validation of API functions
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Joi from 'joi-browser'

/**
 * @typedef {Object} BigNumber
 * @property {boolean} [isBigNumber] - type identifier, optional, because supported from v3.1.0
 * @property {number[]} c - coefficient
 * @property {number} e - exponent
 * @property {number} s - sign
 */
const bigNumber = Joi.object().keys({
  isBigNumber: Joi.boolean().valid(true),
  c: Joi.array().items(Joi.number()).required(),
  e: Joi.number().integer().min(-1000000000).max(1000000000).required(),
  s: Joi.number().integer().valid([-1, 1]).required(),
})

const blockString = Joi.string().valid(['latest', 'pending'])
const hash = Joi.string().regex(/^[a-fx0-9]+$/i)

const options = {
  fromBlock: [Joi.number().integer().min(0), blockString],
  toBlock: [Joi.number().integer().min(0), blockString],
  address: [hash.length(42), Joi.array().items(hash.length(42))],
  topics: Joi.array().allow(null),
}

const validationRules = {
  host: Joi.string().min(3).max(300),
  port: Joi.number().integer().min(1).max(65535),
  ssl: Joi.boolean(),
  address: hash.length(42),
  privateKey: hash.length(64),
  value: bigNumber,
  event: Joi.string().min(1).max(99),
  method: Joi.string().alphanum().min(1).max(99),
  args: Joi.array(),
  data: hash.max(9999),
  gasLimit: bigNumber,
  gasPrice: bigNumber,
  nonce: Joi.number().integer().min(0),
  callback: Joi.func(),
  blockId: [
    hash.length(66),
    Joi.number().integer().min(0),
    Joi.string().valid(['earliest', 'latest', 'pending']),
  ],
  returnTransactionObjects: Joi.boolean(),
  transactionHash: hash.length(66),
  logsOptions: Joi.object().keys(options),
  eventOptions: Joi.object().keys({
    ...options,
    filter: Joi.object(),
  }),
}

const generalETHKeys = {
  rpcaddr: validationRules.host.required(),
  rpcport: validationRules.port.required(),
  ssl: validationRules.ssl,
}

const generalContractKeys = {
  ...generalETHKeys,
  contractAddress: validationRules.address.required(),
}

const estimateGasKeys = {
  ...generalContractKeys,
  privateKey: validationRules.privateKey,
  from: validationRules.address,
  method: validationRules.method.required(),
  args: validationRules.args.required(),
}

export { generalETHKeys, generalContractKeys, estimateGasKeys, validationRules as default }
