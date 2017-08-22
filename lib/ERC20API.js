import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import submitContractTx from './utils/submitContractTx'
import getContractInstance from './utils/getContractInstance'
import estimateGasForContractMethod from './utils/estimateGasForContractMethod'
import { getPastContractEvents, subscribeToContractEvent } from './utils/eventUtils'

import {
  checkParamNumber,
  checkParamStr,
  checkParamObject,
  checkParamFunction,
  checkParamAddress,
  checkParamPrivateKey,
} from './utils/checkParam'

const contractInterface = 'ERC20'

/**
 * ERC20API 'calling' methods
 */

export function totalSupply(props) {
  const { rpcaddr, rpcport, contractAddress } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.totalSupply.call)()
}

export function balanceOf(props) {
  const { rpcaddr, rpcport, contractAddress, owner } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamAddress(owner)

  return Promise.promisify(contractInstance.balanceOf.call)(owner)
}

/**
 * ERC20API 'transaction' methods
 */

export function transfer(props) {
  const { rpcaddr, rpcport, contractAddress, privateKey, gasLimit, to, value } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamPrivateKey(privateKey)
  checkParamNumber(gasLimit, 'gasLimit')
  checkParamAddress(to)
  checkParamNumber(value, 'value')

  return submitContractTx({
    privateKey,
    gasLimit,
    args: [to, value],
    method: contractInstance.transfer,
  })
}

/**
 * ERC20API events
 */

export function allEvents(props) {
  const { rpcaddr, rpcport, contractAddress, options, callback } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  // options param is optional
  if (options != null) {
    checkParamObject(options, 'options', ['filter'])
  }

  // callback param is optional
  if (callback != null) {
    checkParamFunction(callback, 'callback')
  }

  return subscribeToContractEvent(contractInstance.allEvents, options, callback)
}

export function getPastEvents(props) {
  const { rpcaddr, rpcport, contractAddress, event, options } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamStr(event, 'event')

  // options param is optional
  if (options != null) {
    checkParamObject(options, 'options', ['filter'])
  }

  return getPastContractEvents(contractInstance[event], options)
}

export function Transfer(props) {
  const { rpcaddr, rpcport, contractAddress, options, callback } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  // options param is optional
  if (options != null) {
    checkParamObject(options, 'options', ['filter'])
  }

  // callback param is optional
  if (callback != null) {
    checkParamFunction(callback, 'callback')
  }

  return subscribeToContractEvent(contractInstance.Transfer, options, callback)
}

/**
 * Estimate gas for specific method call
 */

export function estimateGas(props) {
  return estimateGasForContractMethod(contractInterface, props)
}
