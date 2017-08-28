import Promise from 'bluebird'

export function getTxCount(address) {
  return Promise.promisify(web3.eth.getTransactionCount)(address)
}

export function getGasPrice() {
  return Promise.promisify(web3.eth.getGasPrice)()
}

export function getGasLimit(props) {
  return Promise.promisify(web3.eth.estimateGas)(props)
}

export function getContractGasLimit(method, args) {
  console.log('getContractGasLimit', args)

  return Promise.promisify(method.estimateGas)(...args)
}
