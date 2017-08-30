import Promise from 'bluebird'

import getAddressFromPrivateKey from '../getAddressFromPrivateKey'

import validate from '../../validation'

import initWeb3 from '../../utils/initWeb3'
import { signTx, getRawTx, getGasLimit } from '../../utils/txUtils'

const promiseTimeout = 1000 * 30

export function call(payload) {
  return prepareETHMethod(payload).then(callETHMethod)
}

export function sendTransaction(payload) {
  return prepareETHMethod(payload).then(sendETHTransaction)
}

export function estimateGas(payload) {
  return prepareETHMethod(payload).then(estimateETHGas)
}

function prepareETHMethod(payload) {
  return Promise
    .bind(this, payload)
    .then(validate)
    .then(initWeb3)
}

function callETHMethod(payload) {
  const { method, args } = payload

  return Promise
    .promisify(web3.eth[method])(...args)
    .timeout(
      promiseTimeout,
      new Error(`Can not call web3.eth.${method} within ${promiseTimeout}ms`)
    )
}

async function sendETHTransaction(payload) {
  const { privateKey, gasLimit, data, to, value } = payload.props

  const address = getAddressFromPrivateKey(privateKey)
  const rawTx = await getRawTx({ gasLimit, address, data, to, value })
  const signedTx = signTx(rawTx, privateKey)

  return Promise
    .promisify(web3.eth.sendRawTransaction)(signedTx)
    .timeout(
      promiseTimeout,
      new Error('Can not call web3.eth.sendRawTransaction within ${promiseTimeout}ms')
    )
}

function estimateETHGas(payload) {
  return getGasLimit(payload.props)
}

export default { call, sendTransaction, estimateGas }
