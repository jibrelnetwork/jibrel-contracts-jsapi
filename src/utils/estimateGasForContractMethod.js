import initWeb3 from './initWeb3'
import { getContractGasLimit } from './txUtils'
import getContractInstance from './getContractInstance'
import getAddressFromPrivateKey from './getAddressFromPrivateKey'

export default function estimateGasForContractMethod(contractInterface, props) {
  const { rpcaddr, rpcport, contractAddress, privateKey, method, args } = props

  initWeb3(rpcaddr, rpcport)
  const contractInstance = getContractInstance(contractAddress, contractInterface)

  const address = getAddressFromPrivateKey(privateKey)

  // Extend contract method args. Add transaction object as last argument
  const transactionObject = { from: address }
  args.push(transactionObject)

  return getContractGasLimit(contractInstance[method], args)
}
