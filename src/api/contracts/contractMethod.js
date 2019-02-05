/**
 * @file Manages web3.eth.contract wrapper
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Promise from 'bluebird'

import config from '../../config'
import validate from '../../validation'
import checkWeb3 from '../../utils/checkWeb3'
import getContractInstance from './getContractInstance'
import getAddressFromPrivateKey from '../getAddressFromPrivateKey'

import {
  getEvents,
  subscribe,
} from '../../utils/eventUtils'

import * as txUtils from '../../utils/txUtils'

/**
 * @async
 * @function call
 *
 * @description Wrapper for callContractMethod function (@see callContractMethod)
 */
function call(payload) {
  return prepareContractInstanceMethod(payload).then(callContractMethod)
}

/**
 * @async
 * @function sendTransaction
 *
 * @description Wrapper for sendContractTransaction function (@see sendContractTransaction)
 */
function sendTransaction(payload) {
  return prepareContractInstanceMethod(payload).then(sendContractTransaction)
}

/**
 * @async
 * @function subscribeToEvent
 *
 * @description Wrapper for subscribeToContractEvent function (@see subscribeToContractEvent)
 */
function subscribeToEvent(payload) {
  return prepareContractInstanceMethod(payload).then(subscribeToContractEvent)
}

/**
 * @async
 * @function getPastEvents
 *
 * @description Wrapper for getPastContractEvents function (@see getPastContractEvents)
 */
function getPastEvents(payload) {
  return prepareContractInstanceMethod(payload).then(getPastContractEvents)
}

/**
 * @async
 * @function estimateGas
 *
 * @description Wrapper for estimateContractGas function (@see estimateContractGas)
 */
function estimateGas(payload) {
  return prepareContractInstanceMethod(payload).then(estimateContractGas)
}

function prepareContractInstanceMethod(payload) {
  return Promise
    .bind(this, payload)
    .then(validate)
    .then(checkWeb3)
    .then(getContractInstance)
}

/**
 * @async
 * @function callContractMethod
 *
 * @description Calls specific contract method with provided arguments
 *
 * @param {object} payload - Payload object
 * @param {object} payload.contractInstance - Contract instance
 * @param {string} payload.interfaceName - Interface name
 * @param {string} payload.method - Method name
 * @param {array} payload.args - Method arguments
 *
 * @returns Promise that will be resolved with the result of contract method execution
 */
function callContractMethod(payload) {
  const {
    args,
    method,
    interfaceName,
    contractInstance,
  } = payload

  return Promise
    .promisify(contractInstance[method].call)(...args)
    .timeout(
      config.promiseTimeout,
      new Error(`Can not call ${interfaceName}.${method} within ${config.promiseTimeout}ms`)
    )
}

/**
 * @async
 * @function sendContractTransaction
 *
 * @description Sends contract transaction
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {string} payload.props.privateKey - Private key (64 hex symbols, without '0x' prefix)
 * @param {object} payload.contractInstance - Contract instance
 * @param {string} payload.interfaceName - Interface name
 * @param {string} payload.method - Method name
 * @param {array} payload.args - Method arguments
 *
 * @returns Promise that will be resolved with the hash of the contract transaction
 */
async function sendContractTransaction(payload) {
  const {
    args,
    props,
    method,
    interfaceName,
    contractInstance,
  } = payload

  const { privateKey } = props
  const contractMethod = contractInstance[method]

  const address = getAddressFromPrivateKey(privateKey)

  // Extend contract method args. Add transaction object as last argument
  const transactionObject = { from: address }
  args.push(transactionObject)

  const rawTx = await txUtils.getContractRawTx({ props, address, contractMethod, args })
  const signedTx = txUtils.signTx(rawTx, privateKey)

  return Promise
    .promisify(jWeb3.eth.sendRawTransaction)(signedTx)
    .timeout(
      config.promiseTimeout,
      new Error(`Can not submit ${interfaceName}.${method} within ${config.promiseTimeout}ms`)
    )
}

/**
 * @function subscribeToContractEvent
 *
 * @description Subscribes to specific contract event
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {object} [payload.props.options] - Event options (@see subscribe)
 * @param {eventCallback} [payload.props.callback] - Event callback (@see subscribe)
 * @param {object} payload.contractInstance - Contract instance
 * @param {string} payload.method - Event name
 *
 * @returns {object} The event emitter (@see subscribe)
 */
function subscribeToContractEvent(payload) {
  const {
    props,
    method,
    contractInstance,
  } = payload

  const {
    options,
    callback,
  } = props

  return subscribe(contractInstance[method], options, callback)
}

/**
 * @async
 * @function getPastContractEvents
 *
 * @description Gets past contract events
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {string} payload.props.event - Event name
 * @param {object} [payload.props.options] - Event options (@see getEvents)
 * @param {object} payload.contractInstance - Contract instance
 *
 * @returns Promise that will be resolved with past events (@see getEvents)
 */
function getPastContractEvents(payload) {
  const {
    props,
    contractInstance,
  } = payload

  const {
    event,
    options,
  } = props

  return getEvents(contractInstance[event], options)
}

/**
 * @async
 * @function estimateContractGas
 *
 * @description Gets estimate gas for the contract transaction
 * Only one of the two params ({privateKey} or {from}) is required
 * {privateKey} has higher priority
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {string} payload.props.method - Contract method name
 * @param {array} payload.props.args - Contract method arguments
 * @param {string} payload.props.privateKey - Private key (64 hex symbols, without '0x' prefix)
 * @param {string} payload.props.from - Address from (42 hex symbols, with '0x' prefix)
 * @param {object} payload.contractInstance - Contract instance
 *
 * @returns Promise (@see getContractGasLimit)
 */
function estimateContractGas(payload) {
  const {
    props,
    contractInstance,
  } = payload

  const {
    args,
    from,
    method,
  } = props

  // Extend contract method args. Add transaction object as last argument
  const transactionObject = { from }
  args.push(transactionObject)

  return txUtils.estimateContractGas(contractInstance[method], args)
}

export default {
  call,
  estimateGas,
  getPastEvents,
  sendTransaction,
  subscribeToEvent,
}
