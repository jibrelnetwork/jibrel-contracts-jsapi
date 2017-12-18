/**
 * @file Exposes Controller API
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import contractMethod from './contractMethod'

const interfaceName = 'Controller'

/**
 * @async
 * @function mint
 *
 * @description Mint tokens
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.privateKey - Private key (64 hex symbols, without '0x' prefix)
 * @param {string} props.account - Address of account to mint tokens to
 * @param {BigNumber} props.value - Transaction value
 * @param {BigNumber} [props.gasLimit] - Gas limit for the transaction
 * @param {BigNumber} [props.gasPrice] - Gas price for the transaction
 * @param {number} [props.nonce] - Nonce for the transaction
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the hash of created contract transaction
 */
export function mint(props = {}) {
  const { account, value } = props

  return contractMethod.sendTransaction({
    props,
    interfaceName,
    method: 'mint',
    args: [account, value],
  })
}

/**
 * @async
 * @function burn
 *
 * @description Burn tokens
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.privateKey - Private key (64 hex symbols, without '0x' prefix)
 * @param {string} props.account - Address of account to burn tokens from
 * @param {BigNumber} props.value - Transaction value
 * @param {BigNumber} [props.gasLimit] - Gas limit for the transaction
 * @param {BigNumber} [props.gasPrice] - Gas price for the transaction
 * @param {number} [props.nonce] - Nonce for the transaction
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the hash of created contract transaction
 */
export function burn(props = {}) {
  const { account, value } = props

  return contractMethod.sendTransaction({
    props,
    interfaceName,
    method: 'burn',
    args: [account, value],
  })
}

export default { mint, burn }
