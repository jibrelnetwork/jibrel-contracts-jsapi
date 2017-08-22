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

export function getContractGasLimit(method, txData, args) {
  const data = (txData && txData.length)
    ? txData
    : method.getData(...args)

  return Promise.promisify(method.estimateGas)({ data })
}
