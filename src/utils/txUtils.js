import Promise from 'bluebird'

const promiseTimeout = 1000 * 30

export function getTxCount(address) {
  return Promise
    .promisify(web3.eth.getTransactionCount)(address)
    .timeout(promiseTimeout, new Error('Can not get transaction count'))
}

export function getGasPrice() {
  return Promise
    .promisify(web3.eth.getGasPrice)()
    .timeout(promiseTimeout, new Error('Can not get gas price'))
}

export function getGasLimit(props) {
  return Promise
    .promisify(web3.eth.estimateGas)(props)
    .timeout(promiseTimeout, new Error('Can not get estimate gas'))
}

export function getContractGasLimit(method, args) {
  return Promise
    .promisify(method.estimateGas)(...args)
    .timeout(promiseTimeout, new Error('Can not get estimate gas for contract method'))
}
