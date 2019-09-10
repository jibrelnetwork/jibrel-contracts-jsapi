/**
 * @file Manages helper functions to work with smart contract events
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import EventEmitter from 'events'
import request from 'request-promise'

let ETH_GETLOGS_ID = 100000

/**
 * @callback eventCallback
 *
 * @param {Object} error
 * @param {Object} event
 */

/**
 * @function subscribe
 *
 * @description Subscribes to provided event
 *
 * @param {function} Event - Function for event subscribing
 * @param {object} [options={}] - Event options
 * @param {object} [options.filter] - Filter options by indexed event parameters
 * @param {(number|string)} [options.fromBlock] - The number of the earliest block
 * @param {(number|string)} [options.toBlock] - The number of the latest block
 * @param {(string|string[])} [options.address] - An address(es) to get logs from
 * @param {string[]} [options.topics] - Allows to manually set the topics for the event filter
 * @param {eventCallback} [callback] - Callback which fired for each event or error
 *
 * @returns {object} The event emitter has the following events:<br />
 * - data: Fires on each incoming event with the event object as argument<br />
 * - error: Fires when an error in the subscription occours
 */
export function subscribe(Event, options = {}, callback) {
  const eventEmitter = new EventEmitter()

  /**
   * web3@0.x.x event takes filter and additional options in different params
   * web3@1.x.x event takes all options in one param
   */
  const { filter, ...additionalOptions } = options

  Event(filter, additionalOptions, (err, result) => {
    if (err) {
      /**
       * Error event
       *
       * @event subscribeErrorEvent
       * @type {object}
       */
      eventEmitter.emit('error', err)

      if (callback) {
        callback(err)
      }

      return
    }

    /**
     * Data event
     *
     * @event subscribeDataEvent
     * @type {object}
     */
    eventEmitter.emit('data', result)

    if (callback) {
      callback(null, result)
    }
  })

  return eventEmitter
}

/**
 * @async
 * @function getEvents
 *
 * @description Gets past events
 *
 * @param {object} [options={}] - Event options
 * @param {(number|string)} [options.fromBlock] - The number of the earliest block
 * @param {(number|string)} [options.toBlock] - The number of the latest block
 * @param {(string|string[])} [options.address] - An address(es) to get logs from
 * @param {string[]} [options.topics] - Allows to manually set the topics for the event filter
 *
 * @returns Promise that will be resolved with past events
 */
export function getEvents(options = {}) {
  const id = ETH_GETLOGS_ID

  // eslint-disable-next-line no-plusplus
  ETH_GETLOGS_ID++

  return request({
    method: 'POST',
    uri: jWeb3.currentProvider.host,
    body: {
      id,
      jsonrpc: '2.0',
      method: 'eth_getLogs',
      params: [options],
    },
    json: true,
  }).then(response => response && response.result)
}
