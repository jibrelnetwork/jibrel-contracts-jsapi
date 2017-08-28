import Promise from 'bluebird'

import signTx from './signTx'
import { getGasPrice, getTxCount, getContractGasLimit } from './txUtils'
import getAddressFromPrivateKey from './getAddressFromPrivateKey'

export default async function submitContractTx(props) {
  const { method, args, contractAddress, privateKey, gasLimit } = props
  const address = getAddressFromPrivateKey(privateKey)

  // Extend contract method args. Add transaction object as last argument
  const transactionObject = { from: address }
  args.push(transactionObject)

  const rawTx = await getRawTx({ method, args, contractAddress, address, gasLimit })
  const signedTx = signTx(rawTx, privateKey)

  return Promise.promisify(web3.eth.sendRawTransaction)(signedTx)
}

async function getRawTx({ method, args, contractAddress, address, gasLimit }) {
  const txData = method.getData(...args)
  const gasPrice = await getGasPrice()

  return {
    data: txData,
    to: contractAddress,
    gasPrice: gasPrice.toNumber(),
    nonce: await getTxCount(address),
    gasLimit: (gasLimit != null) ? gasLimit : await getContractGasLimit(method, args),
  }
}
