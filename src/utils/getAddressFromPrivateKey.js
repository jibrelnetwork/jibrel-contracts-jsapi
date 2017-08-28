import CryptoJS from 'crypto-js'
import { ec as EC } from 'elliptic'

const ec = new EC('secp256k1')

export default function getAddressFromPrivateKey(privateKey) {
  const keyPair = ec.genKeyPair()
  keyPair._importPrivate(privateKey, 'hex')

  const compact = false

  const pubKey = keyPair.getPublic(compact, 'hex').slice(2)
  const pubKeyWordArray = CryptoJS.enc.Hex.parse(pubKey)
  const hash = CryptoJS.SHA3(pubKeyWordArray, { outputLength: 256 })
  const address = hash.toString(CryptoJS.enc.Hex).slice(24)

  return `0x${address}`
}
