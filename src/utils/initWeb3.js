/**
 * @file Manages helper functions to init web3 object globally
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Web3 from 'web3'

/**
 * @function initWeb3
 *
 * @description Initialises web3 object globally
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {string} payload.props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} payload.props.rpcport - RPC port of Ethereum node to connect on
 * @param {boolean} [payload.props.ssl] - Defines using of ssl for connection or not
 *
 * @returns {object} The same (as input) payload object
 */
export default function initWeb3(payload) {
  // check if web3 object already injected in global scope
  if (isWeb3Injected()) {
    return payload
  }

  const rpcEndpoint = getRPCEndpoint(payload.props)
  const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint))

  setGlobalWeb3(web3)

  return payload
}

function isWeb3Injected() {
  const globalScope = (typeof window !== 'undefined') ? window : global

  if (globalScope.isWeb3Injected) {
    return true
  }

  return checkWeb3IsConnected(globalScope.web3)
}

function getRPCEndpoint({ rpcaddr, rpcport, ssl }) {
  return `http${ssl ? 's' : ''}://${rpcaddr}:${rpcport}`
}

function setGlobalWeb3(web3) {
  const globalScope = (typeof window !== 'undefined') ? window : global

  if (!checkWeb3IsConnected(web3)) {
    throw (new Error('Could not set web3 as global object because it is not connected to the node'))
  }

  globalScope.web3 = web3
  globalScope.isWeb3Injected = true
}

function checkWeb3IsConnected(web3) {
  const isWeb3Connected = web3 && web3.isConnected()

  if (!isWeb3Connected) {
    return false
  }

  return checkWeb3ethSupportedMethods(web3)
}

function checkWeb3ethSupportedMethods(web3) {
  const web3eth = web3.eth

  if (!web3eth) {
    throw (new Error('web3.eth is not supported'))
  }

  const supportedMethods = [
    'getBalance',
    'contract',
    'sendRawTransaction',
    'getTransactionCount',
    'getGasPrice',
    'estimateGas',
  ]

  supportedMethods.forEach((method) => {
    if (!(method in web3eth)) {
      throw (new Error(`web3.eth.${method} is not supported`))
    }
  })

  return true
}
