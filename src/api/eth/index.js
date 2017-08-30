import ethMethod from './ethMethod'

const interfaceName = 'ETH'

export function sendTransaction(props) {
  return ethMethod.sendTransaction({ props, interfaceName, method: 'sendTransaction' })
}

export function getBalance(props = {}) {
  const { address, defaultBlock } = props

  return ethMethod.call({
    props,
    interfaceName,
    method: 'getBalance',
    args: [address, defaultBlock],
  })
}

export function estimateGas(props) {
  return ethMethod.estimateGas({ props, interfaceName, method: 'estimateGas' })
}

export default { sendTransaction, getBalance, estimateGas }
