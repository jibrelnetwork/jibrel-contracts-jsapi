/**
 * @file Exposes validation schemas for ERC20Mintable interface
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Joi from 'joi-browser'

import validationRules, {
  generalETHKeys,
  generalContractKeys,
} from '../validationRules'

const getPastEvents = Joi.object().keys({
  ...generalETHKeys,
  options: validationRules.eventOptions,
})

const allEvents = Joi.object().keys({
  ...generalContractKeys,
  options: validationRules.eventOptions,
  callback: validationRules.callback,
})

const MintEvent = allEvents
const BurnEvent = allEvents

export default {
  allEvents,
  MintEvent,
  BurnEvent,
  getPastEvents,
}
