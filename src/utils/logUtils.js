/**
 * @file Manages helper functions to work with logs
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Promise from 'bluebird'

import config from '../config'

/**
 * @function filter
 *
 * @description Gets filter object, that can be used for getting of past logs or watching of new
 *
 * @param {object} [options={}] - Filter options
 * @param {(number|string)} [options.fromBlock] - The number of the earliest block
 * @param {(number|string)} [options.toBlock] - The number of the latest block
 * @param {(string|string[])} [options.address] - An address(es) to get logs from
 * @param {string[]} [options.topics] - Allows to manually set the topics for the event filter
 *
 * @returns {object} (@see {@link https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethfilter})
 */
export function filter(options = {}) {
  return jWeb3.eth.filter(options)
}

/**
 * @async
 * @function getLogs
 *
 * @description Gets past logs
 *
 * @param {object} [options={}] - Filter options
 * @param {(number|string)} [options.fromBlock] - The number of the earliest block
 * @param {(number|string)} [options.toBlock] - The number of the latest block
 * @param {(string|string[])} [options.address] - An address(es) to get logs from
 * @param {string[]} [options.topics] - Allows to manually set the topics for the event filter
 *
 * @returns Promise that will be resolved with past logs
 */
export function getLogs(options = {}) {
  const filterObject = jWeb3.eth.filter(options)

  /**
   * filter.get uses instance methods inside,
   * but bluebird promisify don't save context,
   * so need to bind to filter object directly
   */
  return Promise
    .promisify(filterObject.get.bind(filterObject))()
    .timeout(
      config.promiseTimeout,
      new Error(`Can not get past logs within ${config.promiseTimeout}ms`)
    )
}
