import Promise from 'bluebird'

export function getTxCount(addressHexString) {
  return Promise.promisify(web3.eth.getTransactionCount)(addressHexString)
}

export function getGasPrice() {
  return Promise.promisify(web3.eth.getGasPrice)()
}
