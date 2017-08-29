import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import submitTx from './utils/submitTx'
import { getGasLimit } from './utils/txUtils'

import { validate, ETHSchemas } from './validationSchemas'

const promiseTimeout = 1000 * 30

export async function sendTransaction(props) {
  const validatedProps = await validate(props, ETHSchemas.sendTransaction)

  initWeb3(validatedProps)

  return submitTx(validatedProps)
}

export async function getBalance(props) {
  const validatedProps = await validate(props, ETHSchemas.getBalance)
  const { address, defaultBlock } = validatedProps

  initWeb3(validatedProps)

  return Promise
    .promisify(web3.eth.getBalance)(address, defaultBlock)
    .timeout(promiseTimeout, new Error('Can not get balance'))
}

export async function estimateGas(props) {
  const validatedProps = await validate(props, ETHSchemas.estimateGas)
  const { data, to, value } = validatedProps

  initWeb3(validatedProps)

  return getGasLimit({ data, to, value })
}
