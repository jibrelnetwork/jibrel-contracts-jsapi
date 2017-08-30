import memoize from '../../utils/memoize'

import ERC20ABI from '../../abi/ERC20.json'
import ERC20NamedABI from '../../abi/ERC20Named.json'
import ERC20ValidatableABI from '../../abi/ERC20Validatable.json'

const supportedContracts = {
  ERC20: ERC20ABI,
  ERC20Named: ERC20NamedABI,
  ERC20Validatable: ERC20ValidatableABI,
}

function _getContract(interfaceName) {
  const contractABI = supportedContracts[interfaceName]

  const isContractInterfaceSupported = (contractABI != null)

  if (!isContractInterfaceSupported) {
    throw (new Error(`Contract interface ${interfaceName} is not supported`))
  }

  return web3.eth.contract(contractABI)
}

const getContract = memoize(_getContract)

function _getContractAt(contractAddress, interfaceName) {
  const contract = getContract(interfaceName)

  return contract.at(contractAddress)
}

const getContractAt = memoize(_getContractAt)

export default function getContractInstance(payload) {
  const { props, interfaceName } = payload
  const contractInstance = getContractAt(props.contractAddress, interfaceName)

  return { ...payload, contractInstance }
}
