'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

var _validationRules = require('./validationRules');

var _validationRules2 = _interopRequireDefault(_validationRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendTransaction = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  privateKey: _validationRules2.default.privateKey.required(),
  to: _validationRules2.default.address.required(),
  value: _validationRules2.default.value.required(),
  gasLimit: _validationRules2.default.gasLimit,
  nonce: _validationRules2.default.nonce,
  data: _validationRules2.default.data
});

var getBalance = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  address: _validationRules2.default.address.required(),
  defaultBlock: _validationRules2.default.address
});

var estimateGas = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  to: _validationRules2.default.address.required(),
  value: _validationRules2.default.value.required(),
  data: _validationRules2.default.data
});

exports.default = {
  sendTransaction: sendTransaction,
  getBalance: getBalance,
  estimateGas: estimateGas
};