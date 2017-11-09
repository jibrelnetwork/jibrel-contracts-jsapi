/**
 * @file Manages helper functions to check web3 connection
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Web3 from 'web3'
import Promise from 'bluebird'

import config from '../config'

/**
 * @function checkWeb3
 *
 * @description Checks web3 connection status. Sets web3 globally if it does not exist
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {string} payload.props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} payload.props.rpcport - RPC port of Ethereum node to connect on
 * @param {boolean} [payload.props.ssl] - Defines using of ssl for connection or not
 *
 * @returns {object} The same (as input) payload object
 */
export default function checkWeb3(payload) {
  return Promise
    .bind(this, payload.props)
    .then(getRPCEndpoint)
    .then(checkIsWeb3Inited)
    .return(payload)
}

function getRPCEndpoint({ rpcaddr, rpcport, ssl }) {
  return `http${ssl ? 's' : ''}://${rpcaddr}:${rpcport}`
}

function checkIsWeb3Inited(rpcEndpoint) {
  const globalScope = getGlobalScope()

  // check if web3 object already injected in global scope
  if (globalScope.jWeb3Endpoint === rpcEndpoint) {
    return checkWeb3Connection(globalScope.jWeb3)
  }

  return setGlobalWeb3(rpcEndpoint)
}

function setGlobalWeb3(rpcEndpoint) {
  const jWeb3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint))

  return Promise
    .bind(this, jWeb3)
    .then(checkWeb3Connection)
    .then(() => initWeb3(jWeb3, rpcEndpoint))
}

function initWeb3(jWeb3, rpcEndpoint) {
  const globalScope = getGlobalScope()

  globalScope.jWeb3 = jWeb3
  globalScope.jWeb3Endpoint = rpcEndpoint
}

function checkWeb3Connection(jWeb3) {
  const err = 'Web3 is not connected to the node'

  return new Promise((resolve, reject) => {
    if (!(jWeb3/* && jWeb3.isConnected() */)) {
      return reject(new Error(err))
    }

    return resolve(jWeb3)
  })
    .timeout(config.promiseConnectionTimeout, new Error(err))
    .then(checkSupportedMethods)
}

function checkSupportedMethods(jWeb3) {
  const web3eth = jWeb3.eth

  if (!web3eth) {
    throw (new Error('web3.eth is not supported'))
  }

  const supportedMethods = [
    'getBalance',
    'getBlock',
    'contract',
    'filter',
    'getTransaction',
    'getTransactionCount',
    'getTransactionReceipt',
    'getGasPrice',
    'estimateGas',
    'sendRawTransaction',
  ]

  supportedMethods.forEach((method) => {
    if (!(method in web3eth)) {
      throw (new Error(`web3.eth.${method} is not supported`))
    }
  })
}

function getGlobalScope() {
  return (typeof window !== 'undefined') ? window : global
}
