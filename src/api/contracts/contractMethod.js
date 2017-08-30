import Promise from 'bluebird'

import getContractInstance from './getContractInstance'

import getAddressFromPrivateKey from '../getAddressFromPrivateKey'

import validate from '../../validation'

import initWeb3 from '../../utils/initWeb3'
import { getPast, subscribe } from '../../utils/eventUtils'
import { signTx, getContractRawTx, getContractGasLimit } from '../../utils/txUtils'

const promiseTimeout = 1000 * 30

/**
 * contract 'calling' methods
 */

export function call(payload) {
  return prepareContractInstanceMethod(payload).then(callContractMethod)
}

/**
 * contract 'transaction' methods
 */

export function sendTransaction(payload) {
  return prepareContractInstanceMethod(payload).then(sendContractTransaction)
}

/**
 * contract events
 */

export function subscribeToEvent(payload) {
  return prepareContractInstanceMethod(payload).then(subscribeToContractEvent)
}

export function getPastEvents(payload) {
  return prepareContractInstanceMethod(payload).then(getPastContractEvents)
}

/**
 * Estimate gas for specific method call
 */

export function estimateGas(payload) {
  return prepareContractInstanceMethod(payload).then(estimateContractGas)
}

function prepareContractInstanceMethod(payload) {
  return Promise
    .bind(this, payload)
    .then(validate)
    .then(initWeb3)
    .then(getContractInstance)
}

function callContractMethod(payload) {
  const { contractInstance, interfaceName, method, args } = payload

  return Promise
    .promisify(contractInstance[method].call)(...args)
    .timeout(
      promiseTimeout,
      new Error(`Can not call ${interfaceName}.${method} within ${promiseTimeout}ms`)
    )
}

async function sendContractTransaction(payload) {
  const { contractInstance, interfaceName, method, props, args } = payload
  const { privateKey } = props
  const contractMethod = contractInstance[method]

  const address = getAddressFromPrivateKey(privateKey)

  // Extend contract method args. Add transaction object as last argument
  const transactionObject = { from: address }
  args.push(transactionObject)

  const rawTx = await getContractRawTx({ props, address, contractMethod, args })
  const signedTx = signTx(rawTx, privateKey)

  return Promise
    .promisify(web3.eth.sendRawTransaction)(signedTx)
    .timeout(
      promiseTimeout,
      new Error(`Can not submit ${interfaceName}.${method} within ${promiseTimeout}ms`)
    )
}

function subscribeToContractEvent(payload) {
  const { contractInstance, method, props } = payload
  const { options, callback } = props

  return subscribe(contractInstance[method], options, callback)
}

function getPastContractEvents(payload) {
  const { contractInstance, method, props } = payload
  const { event, options } = props

  return getPast(contractInstance[event], props.options)
}

function estimateContractGas(payload) {
  const { contractInstance, props } = payload
  const { method, args, privateKey } = props

  const address = getAddressFromPrivateKey(privateKey)

  // Extend contract method args. Add transaction object as last argument
  const transactionObject = { from: address }
  args.push(transactionObject)

  return getContractGasLimit(contractInstance[method], args)
}

export default { call, sendTransaction, subscribeToEvent, getPastEvents, estimateGas }
