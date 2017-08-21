import Web3 from 'web3'

export default function initWeb3(rpcaddr, rpcport) {
  if ((typeof window === 'undefined' && global.web3) || window.web3) {
    return
  }

  const rpcEndpoint = getRPCEndpoint(rpcaddr, rpcport)
  const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint))

  if (typeof window === 'undefined') {
    global.web3 = web3
  } else {
    window.web3 = web3
  }
}

function getRPCEndpoint(addr, port) {
  return `http://${addr}:${port}`
}
