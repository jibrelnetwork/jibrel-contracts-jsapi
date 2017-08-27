import Promise from 'bluebird'

import signTx from './signTx'
import { getTxCount, getGasPrice, getGasLimit } from './txUtils'
import getAddressFromPrivateKey from './getAddressFromPrivateKey'

export default async function submitTx(props) {
  const { privateKey, gasLimit, data, nonce, to, value } = props

  const address = getAddressFromPrivateKey(privateKey)
  const rawTx = await getRawTx({ gasLimit, address, data, nonce, to, value })
  const signedTx = signTx(rawTx, privateKey)

  return Promise.promisify(web3.eth.sendRawTransaction)(signedTx)
}

async function getRawTx({ gasLimit, address, data, nonce, to, value }) {
  const gasPrice = await getGasPrice()

  return {
    data,
    to,
    value,
    gasPrice: gasPrice.toNumber(),
    nonce: (nonce != null) ? nonce : await getTxCount(address),
    gasLimit: (gasLimit != null) ? gasLimit : await getGasLimit({ data, to, value }),
  }
}
