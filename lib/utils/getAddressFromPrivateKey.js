'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAddressFromPrivateKey;

var _cryptoJs = require('crypto-js');

var _cryptoJs2 = _interopRequireDefault(_cryptoJs);

var _elliptic = require('elliptic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ec = new _elliptic.ec('secp256k1');

function getAddressFromPrivateKey(privateKey) {
  var keyPair = ec.genKeyPair();
  keyPair._importPrivate(privateKey, 'hex');

  var compact = false;

  var pubKey = keyPair.getPublic(compact, 'hex').slice(2);
  var pubKeyWordArray = _cryptoJs2.default.enc.Hex.parse(pubKey);
  var hash = _cryptoJs2.default.SHA3(pubKeyWordArray, { outputLength: 256 });
  var address = hash.toString(_cryptoJs2.default.enc.Hex).slice(24);

  return '0x' + address;
}