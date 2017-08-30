import contractMethod from './contractMethod'

const interfaceName = 'ERC20Named'

export function name(props) {
  return contractMethod.call({ props, interfaceName, method: 'name', args: [] })
}

export function symbol(props) {
  return contractMethod.call({ props, interfaceName, method: 'symbol', args: [] })
}

export function decimals(props) {
  return contractMethod.call({ props, interfaceName, method: 'decimals', args: [] })
}

export default { name, symbol, decimals }
