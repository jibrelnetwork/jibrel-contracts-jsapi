/**
 * @file Manages helper function to memoize another functions.
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

/**
 * @function memoize
 *
 * @description Caches result of some function
 *
 * @param {function} fn - Function to memoize
 *
 * @returns Result from cache (if exists) or result of the provided function excecution
 */
export default function memoize(fn) {
  const cache = {}

  return (...args) => {
    /**
     * current jWeb3Endpoint is necessary
     */
    const key = [jWeb3Endpoint, ...args].join(':')

    if (key in cache) {
      return cache[key]
    }

    const value = fn(...args)
    cache[key] = value

    return value
  }
}
