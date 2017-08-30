import contractMethod from './contractMethod'

const interfaceName = 'ERC20Validatable'

export function isReceivingAllowed(props) {
  const { account, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isReceivingAllowed',
    args: [account, value],
  })
}

export function isSpendingAllowed(props) {
  const { account, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isSpendingAllowed',
    args: [account, value],
  })
}

export function isTransferAllowed(props) {
  const { from, to, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isTransferAllowed',
    args: [from, to, value],
  })
}

export function isApproveAllowed(props) {
  const { from, spender, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isApproveAllowed',
    args: [from, spender, value],
  })
}

export function isApprovedSpendingAllowed(props) {
  const { from, spender, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isApprovedSpendingAllowed',
    args: [from, spender, value],
  })
}

export function isTransferFromAllowed(props) {
  const { spender, from, to, value } = props

  return contractMethod.call({
    props,
    interfaceName,
    method: 'isTransferFromAllowed',
    args: [spender, from, to, value],
  })
}

export function estimateGas(props) {
  return contractMethod.estimateGas({ props, interfaceName, method: 'estimateGas' })
}

export default {
  isReceivingAllowed,
  isSpendingAllowed,
  isTransferAllowed,
  isApproveAllowed,
  isApprovedSpendingAllowed,
  isTransferFromAllowed,
  estimateGas,
}
