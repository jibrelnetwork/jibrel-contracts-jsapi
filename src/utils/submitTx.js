import Promise from 'bluebird'

import signTx from './signTx'
import { getTxCount, getGasPrice, getGasLimit } from './txUtils'
import getAddressFromPrivateKey from './getAddressFromPrivateKey'

const promiseTimeout = 1000 * 30

export default async function submitTx(props) {
  const { privateKey, gasLimit, data, to, value } = props

  const address = getAddressFromPrivateKey(privateKey)
  const rawTx = await getRawTx({ gasLimit, address, data, to, value })
  const signedTx = signTx(rawTx, privateKey)

  return Promise
    .promisify(web3.eth.sendRawTransaction)(signedTx)
    .timeout(promiseTimeout, new Error('Can not send raw transaction'))
}

async function getRawTx({ gasLimit, address, data, to, value }) {
  const [txGasPrice, txNonce] = await Promise.all([getGasPrice(), getTxCount(address)])
  const txGasLimit = (gasLimit != null) ? gasLimit : await getGasLimit({ data, to, value })

  return {
    to,
    data,
    nonce: txNonce,
    value: web3.toHex(value),
    gasPrice: web3.toHex(txGasPrice),
    gasLimit: web3.toHex(txGasLimit),
  }
}
