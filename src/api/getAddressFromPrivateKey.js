/**
 * @file Manages helper function for deriving of address from private key
 * @author Ivan Violentov <ivan.violentov@jibrel.network>
 */

import CryptoJS from 'crypto-js'
import { ec as EC } from 'elliptic'

import add0x from '../utils/add0x'

const ec = new EC('secp256k1')

/**
 * @function getAddressFromPrivateKey
 *
 * @description Gets account's address from its private key
 *
 * @param {string} privateKey - Private key (64 hex symbols, without '0x' prefix)
 *
 * @returns {string} Account's address
 */
export default function getAddressFromPrivateKey(privateKey) {
  checkPrivateKey(privateKey)

  const keyPair = ec.genKeyPair()
  keyPair._importPrivate(privateKey, 'hex')

  const compact = false

  const pubKey = keyPair.getPublic(compact, 'hex').slice(2)
  const pubKeyWordArray = CryptoJS.enc.Hex.parse(pubKey)
  const hash = CryptoJS.SHA3(pubKeyWordArray, { outputLength: 256 })
  const address = hash.toString(CryptoJS.enc.Hex).slice(24)

  return add0x(address)
}

function checkPrivateKey(privateKey) {
  const isTypeValid = (typeof privateKey === 'string')
  const isLengthValid = (privateKey.length === 64)
  const isContentValid = /^[a-fA-F0-9]+/.test(privateKey)

  if (!(isTypeValid && isLengthValid && isContentValid)) {
    throw (new Error(`Private key '${privateKey}' is invalid`))
  }
}
