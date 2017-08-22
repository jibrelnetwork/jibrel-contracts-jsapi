import Promise from 'bluebird'

import signTx from './signTx'
import { getGasPrice, getTxCount, getContractGasLimit } from './txUtils'
import getAddressFromPrivateKey from './getAddressFromPrivateKey'

export default async function submitContractTx({ method, args, privateKey, gasLimit }) {
  const txData = method.getData(...args)
  const address = getAddressFromPrivateKey(privateKey)
  const rawTx = await getRawTx(method, txData, address, gasLimit)
  const signedTx = signTx(privateKey, rawTx)

  return Promise.promisify(web3.eth.sendRawTransaction)(signedTx)
}

async function getRawTx(method, txData, address, gasLimit) {
  return {
    data: txData,
    gasPrice: await getGasPrice(),
    nonce: await getTxCount(address),
    gasLimit: gasLimit != null ? gasLimit : await getContractGasLimit(method, txData),
  }
}
