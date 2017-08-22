import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import getContractInstance from './utils/getContractInstance'
import { checkParamNumber, checkParamAddress } from './utils/checkParam'
import estimateGasForContractMethod from './utils/estimateGasForContractMethod'

const contractInterface = 'ERC20Validatable'

/**
 * ERC20ValidatableAPI 'calling' methods
 */

export function isRegulated(props) {
  const { rpcaddr, rpcport, contractAddress } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.isRegulated.call)()
}

export function isReceivingAllowed(props) {
  const { rpcaddr, rpcport, contractAddress, account, value } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamAddress(account)
  checkParamNumber(value, 'value')

  return Promise.promisify(contractInstance.isReceivingAllowed.call)(account, value)
}

export function isSpendingAllowed(props) {
  const { rpcaddr, rpcport, contractAddress, account, value } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamAddress(account)
  checkParamNumber(value, 'value')

  return Promise.promisify(contractInstance.isSpendingAllowed.call)(account, value)
}

export function isTransferAllowed(props) {
  const { rpcaddr, rpcport, contractAddress, from, to, value } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamAddress(from)
  checkParamAddress(to)
  checkParamNumber(value, 'value')

  return Promise.promisify(contractInstance.isTransferAllowed.call)(from, to, value)
}

export function isApproveAllowed(props) {
  const { rpcaddr, rpcport, contractAddress, from, spender, value } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamAddress(from)
  checkParamAddress(spender)
  checkParamNumber(value, 'value')

  return Promise.promisify(contractInstance.isApproveAllowed.call)(from, spender, value)
}

export function isApprovedSpendingAllowed(props) {
  const { rpcaddr, rpcport, contractAddress, from, spender, value } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamAddress(from)
  checkParamAddress(spender)
  checkParamNumber(value, 'value')

  return Promise.promisify(contractInstance.isApprovedSpendingAllowed.call)(from, spender, value)
}

export function isTransferFromAllowed(props) {
  const { rpcaddr, rpcport, contractAddress, spender, from, to, value } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamAddress(spender)
  checkParamAddress(from)
  checkParamAddress(to)
  checkParamNumber(value, 'value')

  return Promise.promisify(contractInstance.isTransferFromAllowed.call)(spender, from, to, value)
}

/**
 * Estimate gas for specific method call
 */

export function estimateGas(props) {
  return estimateGasForContractMethod(contractInterface, props)
}
