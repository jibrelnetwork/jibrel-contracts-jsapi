/**
 * @file Manages helper function for getting of contract instance
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import memoize from '../../utils/memoize'

import supportedContracts from '../../abi'

/**
 * @function getContractInstance
 *
 * @description Gets contract instance
 *
 * @param {object} payload - Payload object
 * @param {object} payload.props - API function properties
 * @param {string} payload.props.contractAddress - Contract address
 * @param {string} payload.interfaceName - Interface name
 *
 * @returns {object} Contract instance
 */
export default function getContractInstance(payload) {
  const { props, interfaceName } = payload
  const contractInstance = getContractAt(props.contractAddress, interfaceName)

  return { ...payload, contractInstance }
}

function _getContract(interfaceName) {
  const contractABI = supportedContracts[interfaceName]

  const isContractInterfaceSupported = (contractABI != null)

  if (!isContractInterfaceSupported) {
    throw (new Error(`Contract interface ${interfaceName} is not supported`))
  }

  return jWeb3.eth.contract(contractABI)
}

const getContract = memoize(_getContract)

function _getContractAt(contractAddress, interfaceName) {
  const contract = getContract(interfaceName)

  return contract.at(contractAddress)
}

const getContractAt = memoize(_getContractAt)
