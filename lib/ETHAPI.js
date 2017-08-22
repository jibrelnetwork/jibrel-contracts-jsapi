import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import submitTx from './utils/submitTx'
import { getGasLimit } from './utils/txUtils'
import { checkParamNumber, checkParamStr, checkParamAddress } from './utils/checkParam'

export function sendTransaction(props) {
  const { rpcaddr, rpcport, ...otherProps } = props

  initWeb3(rpcaddr, rpcport)

  return submitTx(otherProps)
}

export function getBalance(props) {
  const { rpcaddr, rpcport, address, defaultBlock } = props

  initWeb3(rpcaddr, rpcport)

  checkParamAddress(address)
  checkParamAddress(defaultBlock)

  return Promise.promisify(web3.eth.getBalance)(address, defaultBlock)
}

export function estimateGas(props) {
  const { rpcaddr, rpcport, data, to, value } = props

  initWeb3(rpcaddr, rpcport)

  checkParamStr(data, 'data')
  checkParamAddress(to)
  checkParamNumber(value, 'value')

  return getGasLimit({ data, to, value })
}
