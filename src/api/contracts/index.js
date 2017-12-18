/**
 * @file Exposes all supported contracts API
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import controller from './controller'
import erc20 from './erc20'
import erc20Mintable from './erc20Mintable'
import erc20Named from './erc20Named'
import erc20Validatable from './erc20Validatable'

export default { controller, erc20, erc20Mintable, erc20Named, erc20Validatable }
