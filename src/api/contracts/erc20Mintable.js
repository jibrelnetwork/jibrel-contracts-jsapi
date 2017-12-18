/**
 * @file Exposes ERC20Mintable API
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import contractMethod from './contractMethod'

const interfaceName = 'ERC20Mintable'

/**
 * @async
 * @function MintEvent
 *
 * @description Subscribes to MintEvent event
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
export function MintEvent(props) {
  return contractMethod.subscribeToEvent({ props, interfaceName, method: 'MintEvent' })
}

/**
 * @async
 * @function BurnEvent
 *
 * @description Subscribes to BurnEvent event
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
export function BurnEvent(props) {
  return contractMethod.subscribeToEvent({ props, interfaceName, method: 'BurnEvent' })
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

export default { MintEvent, BurnEvent, allEvents, getPastEvents }
