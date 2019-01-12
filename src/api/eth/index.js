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
 * @param {BigNumber} props.value - Transaction value (in wei)
 * @param {BigNumber} [props.gasLimit] - Gas limit for the transaction
 * @param {BigNumber} [props.gasPrice] - Gas price for the transaction
 * @param {number} [props.nonce] - Nonce for the transaction
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
 * @function getCode
 *
 * @description Get the code at a specific address
 *
 * @param {object} props={} - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.address - The address to get the code from
 * @param {(number|string)} [props.defaultBlock] - Redefines of web3.eth.defaultBlock
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with code of the provided address
 */
export function getCode(props = {}) {
  const { address, defaultBlock } = props

  return ethMethod.call({
    props,
    interfaceName,
    method: 'getCode',
    args: [address, defaultBlock],
  })
}

/**
 * @async
 * @function getBlockNumber
 *
 * @description Gets current block number
 *
 * @param {object} props={} - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with current block number
 */
export function getBlockNumber(props = {}) {
  return ethMethod.call({
    props,
    interfaceName,
    method: 'getBlockNumber',
    args: [],
  })
}

/**
 * @async
 * @function getBlock
 *
 * @description Returns block data
 *
 * @param {object} props={} - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} [props.blockId] - block number or hash. Or the string "earliest"/"latest"/"pending"
 * @param {boolean} [props.returnTransactionObjects] - return all transactions as objects if true
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with block data
 */
export function getBlock(props = {}) {
  const { blockId, returnTransactionObjects } = props

  return ethMethod.call({
    props,
    interfaceName,
    method: 'getBlock',
    args: [blockId || 'latest', returnTransactionObjects],
  })
}

/**
 * @async
 * @function getTransaction
 *
 * @description Returns transaction data
 *
 * @param {object} props={} - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.transactionHash - Transaction hash
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with transaction data
 */
export function getTransaction(props = {}) {
  return ethMethod.call({
    props,
    interfaceName,
    method: 'getTransaction',
    args: [props.transactionHash],
  })
}

/**
 * @async
 * @function getTransactionReceipt
 *
 * @description Returns the receipt of a transaction
 *
 * @param {object} props={} - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.transactionHash - Transaction hash
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with transaction receipt
 */
export function getTransactionReceipt(props = {}) {
  return ethMethod.call({
    props,
    interfaceName,
    method: 'getTransactionReceipt',
    args: [props.transactionHash],
  })
}

/**
 * @async
 * @function getLogsFilter
 *
 * @description Returns object for filtering of logs
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {object} [props.options] - Filter options (@see filter)
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the filter object (@see filter)
 */
export function getLogsFilter(props) {
  return ethMethod.filterLogs({ props, interfaceName, method: 'getLogsFilter' })
}

/**
 * @async
 * @function getPastLogs
 *
 * @description Gets past events
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {object} [props.options] - Logs options (@see filter)
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the event logs (@see getLogs)
 */
export function getPastLogs(props) {
  return ethMethod.getPastLogs({ props, interfaceName, method: 'getPastLogs' })
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

export function getNonce(props) {
  return ethMethod.getNonce({ props, interfaceName, method: 'getNonce' })
}

export function getGasPrice(props) {
  return ethMethod.getGasPrice({ props, interfaceName, method: 'getGasPrice' })
}

export default {
  sendTransaction,
  getBalance,
  getBlockNumber,
  getBlock,
  getCode,
  getTransaction,
  getTransactionReceipt,
  getLogsFilter,
  getPastLogs,
  estimateGas,
  getNonce,
  getGasPrice,
}
