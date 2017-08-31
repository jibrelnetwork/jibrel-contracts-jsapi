/**
 * @file Exposes ERC20Validatable API
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import contractMethod from './contractMethod'

const interfaceName = 'ERC20Validatable'

/**
 * @async
 * @function isReceivingAllowed
 *
 * @description Gets isReceivingAllowed flag
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.account - Account address
 * @param {BigNumber} props.value - Transaction value
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the isReceivingAllowed flag
 */
export function isReceivingAllowed(props) {
  const { account, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isReceivingAllowed',
    args: [account, value],
  })
}

/**
 * @async
 * @function isSpendingAllowed
 *
 * @description Gets isSpendingAllowed flag
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.account - Account address
 * @param {BigNumber} props.value - Transaction value
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the isSpendingAllowed flag
 */
export function isSpendingAllowed(props) {
  const { account, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isSpendingAllowed',
    args: [account, value],
  })
}

/**
 * @async
 * @function isTransferAllowed
 *
 * @description Gets isTransferAllowed flag
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.from - Sender address
 * @param {string} props.to - Receiver address
 * @param {BigNumber} props.value - Transaction value
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the isTransferAllowed flag
 */
export function isTransferAllowed(props) {
  const { from, to, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isTransferAllowed',
    args: [from, to, value],
  })
}

/**
 * @async
 * @function isApproveAllowed
 *
 * @description Gets isApproveAllowed flag
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.from - Sender address
 * @param {string} props.spender - Spender address
 * @param {BigNumber} props.value - Transaction value
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the isApproveAllowed flag
 */
export function isApproveAllowed(props) {
  const { from, spender, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isApproveAllowed',
    args: [from, spender, value],
  })
}

/**
 * @async
 * @function isApprovedSpendingAllowed
 *
 * @description Gets isApprovedSpendingAllowed flag
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.from - Sender address
 * @param {string} props.spender - Spender address
 * @param {BigNumber} props.value - Transaction value
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the isApprovedSpendingAllowed flag
 */
export function isApprovedSpendingAllowed(props) {
  const { from, spender, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isApprovedSpendingAllowed',
    args: [from, spender, value],
  })
}

/**
 * @async
 * @function isTransferFromAllowed
 *
 * @description Gets isTransferFromAllowed flag
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.spender - Spender address
 * @param {string} props.from - Sender address
 * @param {string} props.to - Receiver address
 * @param {BigNumber} props.value - Transaction value
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the isTransferFromAllowed flag
 */
export function isTransferFromAllowed(props) {
  const { spender, from, to, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isTransferFromAllowed',
    args: [spender, from, to, value],
  })
}

/**
 * @async
 * @function estimateGas
 *
 * @description Gets estimate gas for the contract transaction
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.privateKey - Private key (64 hex symbols, without '0x' prefix)
 * @param {string} props.method - Method name
 * @param {array} props.args - Method arguments
 *
 * @returns Promise that will be resolved with estimate gas value
 */
export function estimateGas(props) {
  return contractMethod.estimateGas({ props, interfaceName, method: 'estimateGas' })
}

export default {
  isReceivingAllowed,
  isSpendingAllowed,
  isTransferAllowed,
  isApproveAllowed,
  isApprovedSpendingAllowed,
  isTransferFromAllowed,
  estimateGas,
}
