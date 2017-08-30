import Joi from 'joi-browser'

const bigNumber = Joi.object().keys({
  isBigNumber: Joi.boolean().valid(true), // type identifier, optional, because supported from 3.1.0
  c: Joi.array().items(Joi.number()).required(), // coefficient
  e: Joi.number().integer().min(-1000000000).max(1000000000).required(), // exponent
  s: Joi.number().integer().valid([-1, 1]).required(), // sign
})

const validationRules = {
  host: Joi.string().min(3).max(255),
  port: Joi.number().integer().min(1).max(65535),
  ssl: Joi.boolean(),
  address: Joi.string().regex(/^[a-fx0-9]+$/i).length(42),
  privateKey: Joi.string().regex(/^[a-fx0-9]+$/i).length(64),
  value: bigNumber,
  event: Joi.string().min(1).max(999),
  method: Joi.string().min(1).max(999),
  args: Joi.array(),
  data: Joi.string().regex(/^[a-fx0-9]+$/i).max(9999),
  gasLimit: bigNumber,
  callback: Joi.func(),
  eventOptions: Joi.object().keys({
    filter: Joi.object(),
    fromBlock: [Joi.number().integer().positive(), Joi.string().min(6).max(7)],
    toBlock: [Joi.number().integer().positive(), Joi.string().min(6).max(7)],
    address: Joi.string().regex(/^[a-fx0-9]+$/i).length(42),
    topics: Joi.array().allow(null),
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
  privateKey: validationRules.privateKey.required(),
  method: validationRules.method.required(),
  args: validationRules.args.required(),
}

export { generalETHKeys, generalContractKeys, estimateGasKeys, validationRules as default }
