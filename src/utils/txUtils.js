import Promise from 'bluebird'
import Tx from 'ethereumjs-tx'

const promiseTimeout = 1000 * 30

export function signTx(rawTx, privateKey) {
  const tx = new Tx(rawTx)
  tx.sign(new Buffer(privateKey, 'hex'))

  return tx.serialize().toString('hex')
}

export async function getRawTx({ gasLimit, address, data, to, value }) {
  const [txGasPrice, txNonce, txGasLimit] = await Promise.all([
    getGasPrice(),
    getNonce(address),
    gasLimit || getGasLimit({ data, to, value }),
  ])

  return {
    to,
    data,
    nonce: txNonce,
    value: web3.toHex(value),
    gasPrice: web3.toHex(txGasPrice),
    gasLimit: web3.toHex(txGasLimit),
  }
}

export async function getContractRawTx(payload) {
  const { props, address, contractMethod, args } = payload
  const { contractAddress, gasLimit } = props

  const [txData, txGasPrice, txNonce, txGasLimit] = await Promise.all([
    contractMethod.getData(...args),
    getGasPrice(),
    getNonce(address),
    gasLimit || getContractGasLimit(contractMethod, args),
  ])

  return {
    data: txData,
    nonce: txNonce,
    to: contractAddress,
    gasPrice: web3.toHex(txGasPrice),
    gasLimit: web3.toHex(txGasLimit),
  }
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

function getNonce(address) {
  return Promise
    .promisify(web3.eth.getTransactionCount)(address)
    .timeout(promiseTimeout, new Error('Can not get transaction count'))
}

function getGasPrice() {
  return Promise
    .promisify(web3.eth.getGasPrice)()
    .timeout(promiseTimeout, new Error('Can not get gas price'))
}
