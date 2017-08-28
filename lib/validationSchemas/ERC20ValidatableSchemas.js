'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

var _validationRules = require('./validationRules');

var _validationRules2 = _interopRequireDefault(_validationRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isRegulated = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required()
});

var isReceivingAllowed = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  account: _validationRules2.default.address.required(),
  value: _validationRules2.default.value.required()
});

var isSpendingAllowed = isReceivingAllowed;

var isTransferAllowed = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  from: _validationRules2.default.address.required(),
  to: _validationRules2.default.address.required(),
  value: _validationRules2.default.value.required()
});

var isApproveAllowed = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  from: _validationRules2.default.address.required(),
  spender: _validationRules2.default.address.required(),
  value: _validationRules2.default.value.required()
});

var isApprovedSpendingAllowed = isApproveAllowed;

var isTransferFromAllowed = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  spender: _validationRules2.default.address.required(),
  from: _validationRules2.default.address.required(),
  to: _validationRules2.default.address.required(),
  value: _validationRules2.default.value.required()
});

var estimateGas = _joiBrowser2.default.object().keys({
  rpcaddr: _validationRules2.default.host.required(),
  rpcport: _validationRules2.default.port.required(),
  contractAddress: _validationRules2.default.address.required(),
  method: _validationRules2.default.method.required(),
  args: _validationRules2.default.args.required()
});

exports.default = {
  isRegulated: isRegulated,
  isReceivingAllowed: isReceivingAllowed,
  isSpendingAllowed: isSpendingAllowed,
  isTransferAllowed: isTransferAllowed,
  isApproveAllowed: isApproveAllowed,
  isApprovedSpendingAllowed: isApprovedSpendingAllowed,
  isTransferFromAllowed: isTransferFromAllowed,
  estimateGas: estimateGas
};