/**
 * @file Manages helper function for adding of 0x prefix to hex string data.
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

/**
 * @function add0x
 *
 * @description Adds 0x prefix to string
 *
 * @param {string} data - string that should be prefixed by 0x
 *
 * @returns String with 0x prefix
 */
export default function add0x(data) {
  const isExist = !!data
  const isString = (typeof data === 'string')
  const isEmpty = !data.length
  const isAlreadyPrefixed = /^0x/.test(data)

  if (isAlreadyPrefixed) {
    return data
  }

  return (!isExist || !isString || isEmpty) ? '0x0' : `0x${data}`
}
