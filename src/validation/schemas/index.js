/**
 * @file Exposes validation schemas for all supported interfaces
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Controller from './Controller'
import ETH from './ETH'
import ERC20 from './ERC20'
import ERC20Named from './ERC20Named'
import ERC20Mintable from './ERC20Mintable'

export default {
  Controller,
  ETH,
  ERC20,
  ERC20Named,
  ERC20Mintable,
}
