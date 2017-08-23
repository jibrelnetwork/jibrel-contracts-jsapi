import Promise from 'bluebird'

import signTx from './signTx'
import { getTxCount, getGasPrice, getGasLimit } from './txUtils'
import getAddressFromPrivateKey from './getAddressFromPrivateKey'

export default async function submitTx(props) {
  const { privateKey, gasLimit, data, to, value } = props

  const address = getAddressFromPrivateKey(privateKey)
  const rawTx = await getRawTx({ gasLimit, address, data, to, value })
  const signedTx = signTx(privateKey, rawTx)

  return Promise.promisify(web3.eth.sendRawTransaction)(signedTx)
}

async function getRawTx({ gasLimit, address, data, to, value }) {
  const gasPrice = await getGasPrice()

  return {
    data,
    to,
    value,
    gasPrice: gasPrice.toNumber(),
    nonce: await getTxCount(address),
    gasLimit: (gasLimit != null) ? gasLimit : await getGasLimit({ data, to, value }),
  }
}
