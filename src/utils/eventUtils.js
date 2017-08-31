/**
 * @file Manages helper functions to work with events
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Promise from 'bluebird'
import EventEmitter from 'events'

import config from '../config'

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
 * @function getPast
 *
 * @description Gets past events
 *
 * @param {function} Event - Function to get past events
 * @param {object} [options={}] - Event options
 * @param {object} [options.filter] - Filter options by indexed event parameters
 * @param {(number|string)} [options.fromBlock] - The number of the earliest block
 * @param {(number|string)} [options.toBlock] - The number of the latest block
 * @param {(string|string[])} [options.address] - An address(es) to get logs from
 * @param {string[]} [options.topics] - Allows to manually set the topics for the event filter
 *
 * @returns Promise that will be resolved with past events
 */
export function getPast(Event, options = {}) {
  /**
   * web3@0.x.x event takes filter and additional options in different params
   * web3@1.x.x event takes all options in one param
   */
  const { filter, ...additionalOptions } = options
  const event = Event(filter, additionalOptions)

  /**
   * event.get uses instance methods inside,
   * but bluebird promisify don't save context,
   * so need to bind to event object directly
   */
  return Promise
    .promisify(event.get.bind(event))()
    .timeout(
      config.promiseTimeout,
      new Error(`Can not get past events within ${config.promiseTimeout}ms`)
    )
}
