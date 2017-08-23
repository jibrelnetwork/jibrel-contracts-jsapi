import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import submitTx from './utils/submitTx'
import { getGasLimit } from './utils/txUtils'

import { validate, ETHSchemas } from './validationSchemas'

export async function sendTransaction(props) {
  const validatedProps = await validate(props, ETHSchemas.sendTransaction)
  const { rpcaddr, rpcport, ...otherProps } = validatedProps

  initWeb3(rpcaddr, rpcport)

  return submitTx(otherProps)
}

export async function getBalance(props) {
  const validatedProps = await validate(props, ETHSchemas.getBalance)
  const { rpcaddr, rpcport, address, defaultBlock } = validatedProps

  initWeb3(rpcaddr, rpcport)

  return Promise.promisify(web3.eth.getBalance)(address, defaultBlock)
}

export async function estimateGas(props) {
  const validatedProps = await validate(props, ETHSchemas.estimateGas)
  const { rpcaddr, rpcport, data, to, value } = validatedProps

  initWeb3(rpcaddr, rpcport)

  return getGasLimit({ data, to, value })
}
