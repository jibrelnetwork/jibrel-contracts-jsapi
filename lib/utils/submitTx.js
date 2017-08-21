import Promise from 'bluebird'

import signTx from './signTx'
import { getTxCount, getGasPrice } from './txUtils'

export default async function submitTx(props) {
  const { privateKey, ...otherProps } = props
  const rawTx = await getRawTx(otherProps)
  const signedTx = signTx(privateKey, rawTx)

  return Promise.promisify(web3.eth.sendRawTransaction)(signedTx)
}

async function getRawTx(props) {
  const { gasLimit, address, data, to, value } = props

  return {
    data,
    to,
    value,
    gasPrice: await getGasPrice(),
    nonce: await getTxCount(address),
    gasLimit: (gasLimit != null) ? gasLimit : await getGasLimit(props),
  }
}

export function getGasLimit({ address, data, to, value }) {
  return Promise.promisify(web3.eth.estimateGas)({
    data,
    to,
    value,
    from: address,
  })
}

