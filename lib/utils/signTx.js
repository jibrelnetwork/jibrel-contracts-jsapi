'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = signTx;

var _ethereumjsTx = require('ethereumjs-tx');

var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signTx(rawTx, privateKey) {
  var tx = new _ethereumjsTx2.default(rawTx);
  tx.sign(new Buffer(privateKey, 'hex'));

  return tx.serialize().toString('hex');
}