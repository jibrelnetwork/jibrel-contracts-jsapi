import Joi from 'joi-browser'

import { generalKeys } from './validationRules'

const name = Joi.object().keys(generalKeys)
const symbol = name
const decimals = name

export default {
  name,
  symbol,
  decimals,
}
