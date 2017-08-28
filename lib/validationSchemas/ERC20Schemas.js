'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

var _validationRules = require('./validationRules');

var _validationRules2 = _interopRequireDefault(_validationRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var totalSupply = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required()
});

var balanceOf = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  owner: _validationRules2.default.address.required()
});

var transfer = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  privateKey: _validationRules2.default.privateKey.required(),
  to: _validationRules2.default.address.required(),
  value: _validationRules2.default.value.required(),
  gasLimit: _validationRules2.default.gasLimit
});

var getPastEvents = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  event: _validationRules2.default.event.required(),
  options: _validationRules2.default.eventOptions
});

var allEvents = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  options: _validationRules2.default.eventOptions,
  callback: _validationRules2.default.callback
});

var Transfer = allEvents;

var estimateGas = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  privateKey: _validationRules2.default.privateKey.required(),
  method: _validationRules2.default.method.required(),
  args: _validationRules2.default.args.required()
});

exports.default = {
  totalSupply: totalSupply,
  balanceOf: balanceOf,
  transfer: transfer,
  getPastEvents: getPastEvents,
  allEvents: allEvents,
  Transfer: Transfer,
  estimateGas: estimateGas
};