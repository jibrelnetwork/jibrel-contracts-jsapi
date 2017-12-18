/**
 * @file Exposes validation schemas for all supported interfaces
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import Controller from './Controller'
import ETH from './ETH'
import ERC20 from './ERC20'
import ERC20Mintable from './ERC20Mintable'
import ERC20Named from './ERC20Named'
import ERC20Validatable from './ERC20Validatable'

export default {
  Controller,
  ETH,
  ERC20,
  ERC20Mintable,
  ERC20Named,
  ERC20Validatable,
}
