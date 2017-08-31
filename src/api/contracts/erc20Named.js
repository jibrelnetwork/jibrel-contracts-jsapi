/**
 * @file Exposes ERC20Named API
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import contractMethod from './contractMethod'

const interfaceName = 'ERC20Named'

/**
 * @async
 * @function name
 *
 * @description Gets token name
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the token name
 */
export function name(props) {
  return contractMethod.call({ props, interfaceName, method: 'name', args: [] })
}

/**
 * @async
 * @function symbol
 *
 * @description Gets token symbol
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the token symbol
 */
export function symbol(props) {
  return contractMethod.call({ props, interfaceName, method: 'symbol', args: [] })
}

/**
 * @async
 * @function decimals
 *
 * @description Gets token decimals
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with token decimals
 */
export function decimals(props) {
  return contractMethod.call({ props, interfaceName, method: 'decimals', args: [] })
}

export default { name, symbol, decimals }
