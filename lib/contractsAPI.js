import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import getContractInstance from './utils/getContractInstance'
import submitTx, { getGasLimit } from './utils/submitTx'
import submitContractTx, { getContractGasLimit } from './utils/submitContractTx'

const ERC20API = {}
const ERC20ValidatableAPI = {}

// ERC20API 'calling' methods
['totalSupply', 'balanceOf'].forEach((method) => {
  ERC20API[method] = contractInstanceCall(method, 'ERC20')
})

// ERC20API 'transaction' methods
['transfer'].forEach((method) => {
  ERC20API[method] = contractInstanceTx(method, 'ERC20')
})

// ERC20API events
['Transfer'].forEach((event) => {
  ERC20API[event] = contractInstanceEvent(event, 'ERC20')
})

// ERC20ValidatableAPI 'calling' methods
[
  'isRegulated',
  'isReceivingAllowed',
  'isSpendingAllowed',
  'isTransferAllowed',
  'isApproveAllowed',
  'isApprovedSpendingAllowed',
  'isTransferFromAllowed',
].forEach((method) => {
  ERC20ValidatableAPI[method] = contractInstanceCall(method, 'ERC20Validatable')
})

function contractInstanceCall(method, interface) {
  return (props) => {
    const { rpcaddr, rpcport, contractAddress, args = [] } = props

    initWeb3(rpcaddr, rpcport)
    const contractInstance = getContractInstance(contractAddress, interface)

    return Promise.promisify(contractInstance[method].call)(...args)
  }
}

function contractInstanceTx(method, interface) {
  return (props) => {
    const { rpcaddr, rpcport, contractAddress, ...otherProps } = props

    initWeb3(rpcaddr, rpcport)
    const contractInstance = getContractInstance(contractAddress, interface)

    return submitContractTx(contractInstance[method], otherProps)
  }
}

function contractInstanceEvent(event, interface) {
  return (props) => {
    const { rpcaddr, rpcport, contractAddress, args = [] } = props

    initWeb3(rpcaddr, rpcport)
    const contractInstance = getContractInstance(contractAddress, interface)

    return contractInstance[event](...args)
  }
}

export ERC20API
export ERC20ValidatableAPI

export function sendTransaction(props) {
  const { rpcaddr, rpcport, ...otherProps } = props

  initWeb3(rpcaddr, rpcport)

  return submitTx(otherProps)
}

export function getBalance(props) {
  const { rpcaddr, rpcport, args = [] } = props

  initWeb3(rpcaddr, rpcport)

  return Promise.promisify(web3.eth.getBalance)(...args)
}

export function getContractTxGasLimit(props) {
  const { rpcaddr, rpcport, contractAddress, interface, method, args } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, interface)

  return getContractGasLimit(contractInstance[method], args)
}

export getGasLimit
