'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initWeb3;

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initWeb3(rpcaddr, rpcport) {
  // check if web3 object already injected in global scope
  if (isWeb3Injected()) {
    return;
  }

  var rpcEndpoint = getRPCEndpoint(rpcaddr, rpcport);
  var web3 = new _web2.default(new _web2.default.providers.HttpProvider(rpcEndpoint));

  setGlobalWeb3(web3);
}

function isWeb3Injected() {
  var globalScope = typeof window !== 'undefined' ? window : global;

  if (globalScope.isWeb3Injected) {
    return true;
  }

  return checkWeb3IsConnected(globalScope.web3);
}

function getRPCEndpoint(rpcaddr, rpcport) {
  return 'http://' + rpcaddr + ':' + rpcport;
}

function setGlobalWeb3(web3) {
  var globalScope = typeof window !== 'undefined' ? window : global;

  if (!checkWeb3IsConnected(web3)) {
    throw new Error('Could not set web3 as global object because it is not connected to the node');
  }

  globalScope.web3 = web3;
  globalScope.isWeb3Injected = true;
}

function checkWeb3IsConnected(web3) {
  var isWeb3Connected = web3 && web3.isConnected();

  if (!isWeb3Connected) {
    return false;
  }

  return checkWeb3ethSupportedMethods(web3);
}

function checkWeb3ethSupportedMethods(web3) {
  var web3eth = web3.eth;

  if (!web3eth) {
    throw new Error('web3.eth is not supported');
  }

  var supportedMethods = ['getBalance', 'contract', 'sendRawTransaction', 'getTransactionCount', 'getGasPrice', 'estimateGas'];

  supportedMethods.forEach(function (method) {
    if (!(method in web3eth)) {
      throw new Error('web3.eth.' + method + ' is not supported');
    }
  });

  return true;
}