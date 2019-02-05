/**
 * @file Manages web3.eth wrapper
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Promise from 'bluebird'

import config from '../../config'
import validate from '../../validation'
import checkWeb3 from '../../utils/checkWeb3'
import getAddressFromPrivateKey from '../getAddressFromPrivateKey'

import {
  filter,
  getLogs,
} from '../../utils/logUtils'

import * as txUtils from '../../utils/txUtils'

/**
 * @async
 * @function call
 *
 * @description Wrapper for callETHMethod function (@see callETHMethod)
 */
function call(payload) {
  return prepareETHMethod(payload).then(callETHMethod)
}

/**
 * @async
 * @function sendTransaction
 *
 * @description Wrapper for sendETHTransaction function (@see sendETHTransaction)
 */
function sendTransaction(payload) {
  return prepareETHMethod(payload).then(sendETHTransaction)
}

/**
 * @async
 * @function filterLogs
 *
 * @description Wrapper for filterETHLogs function (@see filterETHLogs)
 */
function filterLogs(payload) {
  return prepareETHMethod(payload).then(filterETHLogs)
}

/**
 * @async
 * @function getPastLogs
 *
 * @description Wrapper for getPastETHLogs function (@see getPastETHLogs)
 */
function getPastLogs(payload) {
  return prepareETHMethod(payload).then(getPastETHLogs)
}

/**
 * @async
 * @function estimateGas
 *
 * @description Wrapper for estimateETHGas function (@see estimateETHGas)
 */
function estimateGas(payload) {
  return prepareETHMethod(payload).then(estimateETHGas)
}

/**
 * @async
 * @function getNonce
 *
 * @description Wrapper for getETHNonce function (@see getETHNonce)
 */
function getNonce(payload) {
  return prepareETHMethod(payload).then(getETHNonce)
}

/**
 * @async
 * @function getGasPrice
 * 
 * @param {Object} payload Payload object
 * 
 * @description Wrapper for getGasPrice function (@see getGasPrice)
 */
function getGasPrice(payload) {
  return prepareETHMethod(payload).then(txUtils.getGasPrice)
}

function prepareETHMethod(payload) {
  return Promise
    .bind(this, payload)
    .then(validate)
    .then(checkWeb3)
}

/**
 * @async
 * @function callETHMethod
 *
 * @description Calls specific web3.eth method with provided arguments
 *
 * @param {object} payload - Payload object
 * @param {string} payload.method - Method name
 * @param {array} payload.args - Method arguments
 *
 * @returns Promise that will be resolved with the result of web3.eth method execution
 */
function callETHMethod(payload) {
  const { method, args } = payload

  return Promise
    .promisify(jWeb3.eth[method])(...args)
    .timeout(
      config.promiseTimeout,
      new Error(`Can not call web3.eth.${method} within ${config.promiseTimeout}ms`)
    )
}

/**
 * @async
 * @function sendETHTransaction
 *
 * @description Sends transaction
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - Method properties
 * @param {string} payload.props.privateKey - Private key (64 hex symbols, without '0x' prefix)
 * @param {string} payload.props.to - Address of the transaction receiver
 * @param {BigNumber} payload.props.value - Transaction value
 * @param {BigNumber} [payload.props.gasLimit] - Gas limit for the transaction
 * @param {BigNumber} [payload.props.gasPrice] - Gas price for the transaction
 * @param {number} [payload.props.nonce] - Nonce for the transaction
 * @param {string} [payload.props.data] - Transaction data
 *
 * @returns Promise that will be resolved with the hash of the transaction
 */
async function sendETHTransaction(payload) {
  const { privateKey, to, value, gasLimit, gasPrice, nonce, data } = payload.props

  const address = getAddressFromPrivateKey(privateKey)
  const rawTx = await txUtils.getRawTx({ gasLimit, gasPrice, nonce, address, data, to, value })
  const signedTx = txUtils.signTx(rawTx, privateKey)

  return Promise
    .promisify(jWeb3.eth.sendRawTransaction)(signedTx)
    .timeout(
      config.promiseTimeout,
      new Error(`Can not call web3.eth.sendRawTransaction within ${config.promiseTimeout}ms`)
    )
}

/**
 * @function filterETHLogs
 *
 * @description Initializes filter object
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {object} [payload.props.options] - Filter options (@see filter)
 *
 * @returns {object} The event emitter (@see subscribe)
 */
function filterETHLogs(payload) {
  return filter(payload.props.options)
}

/**
 * @async
 * @function getPastETHLogs
 *
 * @description Gets past ETH logs
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {object} [payload.props.options] - Event options (@see getLogs)
 *
 * @returns Promise that will be resolved with past logs (@see getLogs)
 */
function getPastETHLogs(payload) {
  return getLogs(payload.props.options)
}

/**
 * @async
 * @function estimateETHGas
 *
 * @description Gets estimate gas for the transaction
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - Method properties
 *
 * @returns Promise that will be resolved with estimate gas value
 */
function estimateETHGas(payload) {
  return txUtils.estimateGas(payload.props)
}

/**
 * @async
 * @function getETHNonce
 *
 * @description Gets thansaction count for sending transactions
 *
 * @param {object} payload - Payload object
 * @param {object} payload.args - Method args
 *
 * @returns Promise that will be resolved with transaction count value
 */
function getETHNonce(payload) {
  return txUtils.getTransactionCount(...payload.args)
}

export default {
  call,
  getNonce,
  filterLogs,
  getGasPrice,
  getPastLogs,
  estimateGas,
  sendTransaction,
}
