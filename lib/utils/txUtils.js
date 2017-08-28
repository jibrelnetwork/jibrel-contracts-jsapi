'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.getTxCount = getTxCount;
exports.getGasPrice = getGasPrice;
exports.getGasLimit = getGasLimit;
exports.getContractGasLimit = getContractGasLimit;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTxCount(address) {
  return _bluebird2.default.promisify(web3.eth.getTransactionCount)(address);
}

function getGasPrice() {
  return _bluebird2.default.promisify(web3.eth.getGasPrice)();
}

function getGasLimit(props) {
  return _bluebird2.default.promisify(web3.eth.estimateGas)(props);
}

function getContractGasLimit(method, args) {
  return _bluebird2.default.promisify(method.estimateGas).apply(undefined, (0, _toConsumableArray3.default)(args));
}