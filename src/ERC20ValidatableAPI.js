import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import getContractInstance from './utils/getContractInstance'
import estimateGasForContractMethod from './utils/estimateGasForContractMethod'

import { validate, ERC20ValidatableSchemas } from './validationSchemas'

const contractInterface = 'ERC20Validatable'
const promiseTimeout = 1000 * 30

/**
 * ERC20ValidatableAPI 'calling' methods
 */

export async function isReceivingAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isReceivingAllowed)
  const { contractAddress, account, value } = validatedProps

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise
    .promisify(contractInstance.isReceivingAllowed.call)(account, value)
    .timeout(promiseTimeout, new Error('Can not get isReceivingAllowed flag'))
}

export async function isSpendingAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isSpendingAllowed)
  const { contractAddress, account, value } = validatedProps

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise
    .promisify(contractInstance.isSpendingAllowed.call)(account, value)
    .timeout(promiseTimeout, new Error('Can not get isSpendingAllowed flag'))
}

export async function isTransferAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isTransferAllowed)
  const { contractAddress, from, to, value } = validatedProps

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise
    .promisify(contractInstance.isTransferAllowed.call)(from, to, value)
    .timeout(promiseTimeout, new Error('Can not get isTransferAllowed flag'))
}

export async function isApproveAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isApproveAllowed)
  const { contractAddress, from, spender, value } = validatedProps

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise
    .promisify(contractInstance.isApproveAllowed.call)(from, spender, value)
    .timeout(promiseTimeout, new Error('Can not get isApproveAllowed flag'))
}

export async function isApprovedSpendingAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isApprovedSpendingAllowed)
  const { contractAddress, from, spender, value } = validatedProps

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise
    .promisify(contractInstance.isApprovedSpendingAllowed.call)(from, spender, value)
    .timeout(promiseTimeout, new Error('Can not get isApprovedSpendingAllowed flag'))
}

export async function isTransferFromAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isTransferFromAllowed)
  const { contractAddress, spender, from, to, value } = validatedProps

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise
    .promisify(contractInstance.isTransferFromAllowed.call)(spender, from, to, value)
    .timeout(promiseTimeout, new Error('Can not get isTransferFromAllowed flag'))
}

/**
 * Estimate gas for specific method call
 */

export async function estimateGas(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.estimateGas)

  return estimateGasForContractMethod(contractInterface, validatedProps)
}
