import Joi from 'joi-browser'

const validationRules = {
  host: Joi.string().hostname(),
  port: Joi.number().integer().min(1).max(65535),
  address: Joi.string().regex(/^[a-zA-Z0-9]+$/).length(42),
  privateKey: Joi.string().alphanum().length(64),
  value: Joi.number().positive(),
  event: Joi.string().min(1).max(999),
  method: Joi.string().min(1).max(999),
  args: Joi.array(),
  data: Joi.string().regex(/^[a-zA-Z0-9]+$/).max(9999),
  gasLimit: Joi.number().positive(),
  callback: Joi.func(),
  eventOptions: Joi.object().keys({
    filter: Joi.object(),
    fromBlock: [Joi.number().integer().positive(), Joi.string().min(6).max(7)],
    toBlock: [Joi.number().integer().positive(), Joi.string().min(6).max(7)],
    address: Joi.string().regex(/^[a-zA-Z0-9]+$/).length(42),
    topics: Joi.array(),
  }),
}

export default validationRules
