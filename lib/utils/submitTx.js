import Promise from 'bluebird'

import signTx from './signTx'
import { getTxCount, getGasPrice, getGasLimit } from './txUtils'
import getAddressFromPrivateKey from './getAddressFromPrivateKey'

import {
  checkParamNumber,
  checkParamStr,
  checkParamAddress,
  checkParamPrivateKey,
} from './checkParam'

export default async function submitTx(props) {
  const { privateKey, gasLimit, data, to, value } = props

  checkParamAddress(to)
  checkParamPrivateKey(privateKey)
  checkParamStr(data, 'data')
  checkParamNumber(value, 'value')
  checkParamNumber(gasLimit, 'gasLimit')

  const address = getAddressFromPrivateKey(privateKey)
  const rawTx = await getRawTx({ gasLimit, address, data, to, value })
  const signedTx = signTx(privateKey, rawTx)

  return Promise.promisify(web3.eth.sendRawTransaction)(signedTx)
}

async function getRawTx({ gasLimit, address, data, to, value }) {
  return {
    data,
    to,
    value,
    gasPrice: await getGasPrice(),
    nonce: await getTxCount(address),
    gasLimit: (gasLimit != null) ? gasLimit : await getGasLimit({ data, to, value }),
  }
}
