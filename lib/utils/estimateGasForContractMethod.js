import initWeb3 from './initWeb3'
import { getContractGasLimit } from './txUtils'
import getContractInstance from './getContractInstance'
import { checkParamStr, checkParamArray } from './checkParam'

export default function estimateGasForContractMethod(contractInterface, props) {
  const { rpcaddr, rpcport, contractAddress, method, args } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  checkParamStr(method, 'method')
  checkParamArray(args, 'args')

  return getContractGasLimit(contractInstance[method], null, args)
}
