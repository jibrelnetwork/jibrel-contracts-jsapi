/**
 * @file Exposes ETH API
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import ethMethod from './ethMethod'

const interfaceName = 'ETH'

/**
 * @async
 * @function sendTransaction
 *
 * @description Sends transaction
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.privateKey - Private key (64 hex symbols, without '0x' prefix)
 * @param {string} props.to - Address of the transaction receiver
 * @param {BigNumber} props.value - Transaction value
 * @param {BigNumber} [props.gasLimit] - Gas limit for the transaction
 * @param {string} [props.data] - Transaction data
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the hash of created transaction
 */
export function sendTransaction(props) {
  return ethMethod.sendTransaction({ props, interfaceName, method: 'sendTransaction' })
}

/**
 * @async
 * @function getBalance
 *
 * @description Gets balance of the provided address
 *
 * @param {object} props={} - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.address - Address to check balance
 * @param {(number|string)} [props.defaultBlock] - Redefines of web3.eth.defaultBlock
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with balance of the provided address
 */
export function getBalance(props = {}) {
  const { address, defaultBlock } = props

  return ethMethod.call({
    props,
    interfaceName,
    method: 'getBalance',
    args: [address, defaultBlock],
  })
}

/**
 * @async
 * @function estimateGas
 *
 * @description Gets estimate gas for the transaction
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.to - Address of the transaction receiver
 * @param {BigNumber} props.value - Transaction value
 * @param {string} [props.data] - Transaction data
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with estimate gas value
 */
export function estimateGas(props) {
  return ethMethod.estimateGas({ props, interfaceName, method: 'estimateGas' })
}

export default { sendTransaction, getBalance, estimateGas }
