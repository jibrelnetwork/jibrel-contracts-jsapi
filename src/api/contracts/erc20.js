/**
 * @file Exposes ERC20 API
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import contractMethod from './contractMethod'

const interfaceName = 'ERC20'

/**
 * @async
 * @function totalSupply
 *
 * @description Gets total supply of tokens
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the total supply of tokens
 */
export function totalSupply(props) {
  return contractMethod.call({ props, interfaceName, method: 'totalSupply', args: [] })
}

/**
 * @async
 * @function balanceOf
 *
 * @description Gets balance of specific address
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.owner - Address to check balance
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the balance of owner address
 */
export function balanceOf(props = {}) {
  return contractMethod.call({ props, interfaceName, method: 'balanceOf', args: [props.owner] })
}

/**
 * @async
 * @function transfer
 *
 * @description Transfers tokens
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.privateKey - Private key (64 hex symbols, without '0x' prefix)
 * @param {string} props.to - Address of tokens receiver
 * @param {BigNumber} props.value - Transaction value
 * @param {BigNumber} [props.gasLimit] - Gas limit for the transaction
 * @param {BigNumber} [props.gasPrice] - Gas price for the transaction
 * @param {number} [props.nonce] - Nonce for the transaction
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the hash of created contract transaction
 */
export function transfer(props = {}) {
  const { to, value } = props

  return contractMethod.sendTransaction({
    props,
    interfaceName,
    method: 'transfer',
    args: [to, value],
  })
}

/**
 * @async
 * @function Transfer
 *
 * @description Subscribes to Transfer event
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {object} [props.options] - Event options (@see subscribe)
 * @param {function} [props.callback] - Event callback (@see subscribe)
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the event emitter (@see subsribe)
 */
export function Transfer(props) {
  return contractMethod.subscribeToEvent({ props, interfaceName, method: 'Transfer' })
}

/**
 * @async
 * @function allEvents
 *
 * @description Subscribes to all contract events
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {object} [props.options] - Event options (@see subscribe)
 * @param {function} [props.callback] - Event callback (@see subscribe)
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the event emitter (@see subsribe)
 */
export function allEvents(props) {
  return contractMethod.subscribeToEvent({ props, interfaceName, method: 'allEvents' })
}

/**
 * @async
 * @function getPastEvents
 *
 * @description Gets past events
 *
 * @param {object} props - API function properties
 * @param {string} props.rpcaddr - RPC address of Ethereum node to connect on
 * @param {number} props.rpcport - RPC port of Ethereum node to connect on
 * @param {string} props.contractAddress - Contract address
 * @param {string} props.event - Event name (@see subscribe)
 * @param {object} [props.options] - Event options (@see subscribe)
 * @param {boolean} [props.ssl] - Defines using of ssl for connection or not
 *
 * @returns Promise that will be resolved with the event logs (@see getPast)
 */
export function getPastEvents(props) {
  return contractMethod.getPastEvents({ props, interfaceName, method: 'getPastEvents' })
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

export default { totalSupply, balanceOf, transfer, Transfer, allEvents, getPastEvents, estimateGas }
