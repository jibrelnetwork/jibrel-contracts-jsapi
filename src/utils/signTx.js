import Tx from 'ethereumjs-tx'

export default function signTx(rawTx, privateKey) {
  const tx = new Tx(rawTx)
  tx.sign(new Buffer(privateKey, 'hex'))

  return tx.serialize().toString('hex')
}
