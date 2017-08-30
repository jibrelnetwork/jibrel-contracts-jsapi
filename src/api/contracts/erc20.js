import contractMethod from './contractMethod'

const interfaceName = 'ERC20'

export function totalSupply(props) {
  return contractMethod.call({ props, interfaceName, method: 'totalSupply', args: [] })
}

export function balanceOf(props = {}) {
  return contractMethod.call({ props, interfaceName, method: 'balanceOf', args: [props.owner] })
}

export async function transfer(props = {}) {
  const { to, value } = props

  return contractMethod.sendTransaction({
    props,
    interfaceName,
    method: 'transfer',
    args: [to, value],
  })
}

export function Transfer(props) {
  return contractMethod.subscribeToEvent({ props, interfaceName, method: 'Transfer' })
}

export function allEvents(props) {
  return contractMethod.subscribeToEvent({ props, interfaceName, method: 'allEvents' })
}

export function getPastEvents(props) {
  return contractMethod.getPastEvents({ props, interfaceName, method: 'getPastEvents' })
}

export function estimateGas(props) {
  return contractMethod.estimateGas({ props, interfaceName, method: 'estimateGas' })
}

export default { totalSupply, balanceOf, transfer, Transfer, allEvents, getPastEvents, estimateGas }
