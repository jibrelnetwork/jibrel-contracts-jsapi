/**
 * @file Manages configuration for the library
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

export default {
  /**
   * All web3 methods should be fullfiled or rejected within this timeout,
   * otherwise returned promise will be rejected
   *
   * 30 sec (in ms)
   */
  promiseTimeout: 1000 * 30,

  /**
   * web3 connection status should be received within this timeout
   *
   * 3 sec (in ms)
   */
  promiseConnectionTimeout: 1000 * 3,
}
