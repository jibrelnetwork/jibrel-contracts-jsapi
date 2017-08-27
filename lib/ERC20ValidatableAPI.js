import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import getContractInstance from './utils/getContractInstance'
import estimateGasForContractMethod from './utils/estimateGasForContractMethod'

import { validate, ERC20ValidatableSchemas } from './validationSchemas'

const contractInterface = 'ERC20Validatable'

/**
 * ERC20ValidatableAPI 'calling' methods
 */

/*
 * This method is not implemented for CryDR Views
 **/
/*
export async function isRegulated(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isRegulated)
  const { rpcaddr, rpcport, contractAddress } = validatedProps

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.isRegulated.call)()
}
*/

export async function isReceivingAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isReceivingAllowed)
  const { rpcaddr, rpcport, contractAddress, account, value } = validatedProps

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.isReceivingAllowed.call)(account, value)
}

export async function isSpendingAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isSpendingAllowed)
  const { rpcaddr, rpcport, contractAddress, account, value } = validatedProps

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.isSpendingAllowed.call)(account, value)
}

export async function isTransferAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isTransferAllowed)
  const { rpcaddr, rpcport, contractAddress, from, to, value } = validatedProps

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.isTransferAllowed.call)(from, to, value)
}

export async function isApproveAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isApproveAllowed)
  const { rpcaddr, rpcport, contractAddress, from, spender, value } = validatedProps

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.isApproveAllowed.call)(from, spender, value)
}

export async function isApprovedSpendingAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isApprovedSpendingAllowed)
  const { rpcaddr, rpcport, contractAddress, from, spender, value } = validatedProps

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.isApprovedSpendingAllowed.call)(from, spender, value)
}

export async function isTransferFromAllowed(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.isTransferFromAllowed)
  const { rpcaddr, rpcport, contractAddress, spender, from, to, value } = validatedProps

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return Promise.promisify(contractInstance.isTransferFromAllowed.call)(spender, from, to, value)
}

/**
 * Estimate gas for specific method call
 */

export async function estimateGas(props) {
  const validatedProps = await validate(props, ERC20ValidatableSchemas.estimateGas)

  return estimateGasForContractMethod(contractInterface, validatedProps)
}
