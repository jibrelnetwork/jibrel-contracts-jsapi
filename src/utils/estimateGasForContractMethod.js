import initWeb3 from './initWeb3'
import { getContractGasLimit } from './txUtils'
import getContractInstance from './getContractInstance'

export default function estimateGasForContractMethod(contractInterface, props) {
  const { rpcaddr, rpcport, contractAddress, method, args } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  return getContractGasLimit(contractInstance[method], args)
}
