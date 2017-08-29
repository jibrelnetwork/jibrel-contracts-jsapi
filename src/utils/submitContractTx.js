import Promise from 'bluebird'

import signTx from './signTx'
import { getGasPrice, getTxCount, getContractGasLimit } from './txUtils'
import getAddressFromPrivateKey from './getAddressFromPrivateKey'

const promiseTimeout = 1000 * 30

export default async function submitContractTx(props) {
  const { method, args, contractAddress, privateKey, gasLimit } = props
  const address = getAddressFromPrivateKey(privateKey)

  // Extend contract method args. Add transaction object as last argument
  const transactionObject = { from: address }
  args.push(transactionObject)

  const rawTx = await getRawTx({ method, args, contractAddress, address, gasLimit })
  const signedTx = signTx(rawTx, privateKey)

  return Promise
    .promisify(web3.eth.sendRawTransaction)(signedTx)
    .timeout(promiseTimeout, new Error('Can not send raw transaction'))
}

async function getRawTx({ method, args, contractAddress, address, gasLimit }) {
  const txData = method.getData(...args)
  const [txGasPrice, txNonce] = await Promise.all([getGasPrice(), getTxCount(address)])
  const txGasLimit = (gasLimit != null) ? gasLimit : await getContractGasLimit(method, args)

  return {
    data: txData,
    nonce: txNonce,
    to: contractAddress,
    gasPrice: web3.toHex(txGasPrice),
    gasLimit: web3.toHex(txGasLimit),
  }
}
