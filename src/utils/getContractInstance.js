import memoize from './memoize'

import ERC20ABI from '../abi/ERC20.json'
import ERC20NamedABI from '../abi/ERC20Named.json'
import ERC20ValidatableABI from '../abi/ERC20Validatable.json'

const supportedContracts = {
  ERC20: ERC20ABI,
  ERC20Named: ERC20NamedABI,
  ERC20Validatable: ERC20ValidatableABI,
}

function _getContract(contractInterface) {
  const contractABI = supportedContracts[contractInterface]

  const isContractInterfaceSupported = (contractABI != null)

  if (!isContractInterfaceSupported) {
    throw (new Error(`Contract interface ${contractInterface} is not supported`))
  }

  return web3.eth.contract(contractABI)
}

const getContract = memoize(_getContract)

function _getContractInstance(contractAddress, contractInterface) {
  const contract = getContract(contractInterface)

  return contract.at(contractAddress)
}

const getContractInstance = memoize(_getContractInstance)

export default getContractInstance
