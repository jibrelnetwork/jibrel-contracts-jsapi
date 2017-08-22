import memoize from './memoize'
import { checkParamStr, checkParamAddress } from './checkParam'

import ERC20ABI from '../abi/ERC20.json'
import ERC20ValidatableABI from '../abi/ERC20Validatable.json'

function _getContract(contractInterface) {
  checkParamStr(contractInterface, 'contractInterface')

  if (contractInterface === 'ERC20') {
    return web3.eth.contract(ERC20ABI)
  } else if (contractInterface === 'ERC20Validatable') {
    return web3.eth.contract(ERC20ValidatableABI)
  }

  throw (new Error(`ABI for the contractInterface ${contractInterface} not found`))
}

const getContract = memoize(_getContract)

function _getContractInstance(contractAddress, contractInterface) {
  checkParamAddress(contractAddress)

  const contract = getContract(contractInterface)

  return contract.at(contractAddress)
}

const getContractInstance = memoize(_getContractInstance)

export default getContractInstance
