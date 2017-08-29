import Promise from 'bluebird'

import initWeb3 from './utils/initWeb3'
import getContractInstance from './utils/getContractInstance'

import { validate, ERC20NamedSchemas } from './validationSchemas'

const contractInterface = 'ERC20Named'

/**
 * ERC20NamedAPI 'calling' methods
 */

export async function name(props) {
  const validatedProps = await validate(props, ERC20NamedSchemas.name)

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(validatedProps.contractAddress, contractInterface)

  return Promise.promisify(contractInstance.name.call)()
}

export async function symbol(props) {
  const validatedProps = await validate(props, ERC20NamedSchemas.symbol)

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(validatedProps.contractAddress, contractInterface)

  return Promise.promisify(contractInstance.symbol.call)()
}

export async function decimals(props) {
  const validatedProps = await validate(props, ERC20NamedSchemas.decimals)

  initWeb3(validatedProps)
  const contractInstance = getContractInstance(validatedProps.contractAddress, contractInterface)

  return Promise.promisify(contractInstance.decimals.call)()
}
