import Promise from 'bluebird'

import signTx from './signTx'
import { getTxCount, getGasPrice } from './txUtils'

export default async function submitContractTx(method, props) {
  const { privateKey, address, gasLimit, args } = props
  const txData = method.getData(...args)
  const rawTx = await getRawTx(method, txData, address, gasLimit)
  const signedTx = signTx(privateKey, rawTx)

  return Promise.promisify(web3.eth.sendRawTransaction)(signedTx)
}

function getRawTx(method, txData, address, gasLimit) {
  return {
    data: txData,
    gasPrice: await getGasPrice(),
    nonce: await getTxCount(address),
    gasLimit: gasLimit != null ? gasLimit : await getGasLimit(method, txData),
  }
}

function getGasLimit(method, txData) {
  return Promise.promisify(method.estimateGas)({ data: txData })
}

export function getContractGasLimit(method, args) {
  const txData = method.getData(...args)

  return Promise.promisify(method.estimateGas)({ data: txData })
}
