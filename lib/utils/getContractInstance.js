import memoize from './memoize'

import ERC20ABI from '../ERC20ABI.json'
import ERC20ValidatableABI from '../ERC20ValidatableABI.json'

function _getContract(interface) {
  if (interface === 'ERC20') {
    return web3.eth.contract(ERC20ABI)
  } else if (interface === 'ERC20Validatable') {
    return web3.eth.contract(ERC20ValidatableABI)
  }

  throw (new Error(`ABI for the interface ${interface} not found`))
}

const getContract = memoize(_getContract)

function _getContractInstance(contractAddress, interface) {
  const contract = getContract(interface)
  const contractInstance = contract.at(contractAddress)
}

const getContractInstance = memoize(_getContractInstance)

export default getContractInstance
