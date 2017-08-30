import Joi from 'joi-browser'

import { generalContractKeys } from '../validationRules'

const name = Joi.object().keys(generalContractKeys)
const symbol = name
const decimals = name

export default {
  name,
  symbol,
  decimals,
}
