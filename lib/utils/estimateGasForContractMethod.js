'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = estimateGasForContractMethod;

var _initWeb = require('./initWeb3');

var _initWeb2 = _interopRequireDefault(_initWeb);

var _txUtils = require('./txUtils');

var _getContractInstance = require('./getContractInstance');

var _getContractInstance2 = _interopRequireDefault(_getContractInstance);

var _getAddressFromPrivateKey = require('./getAddressFromPrivateKey');

var _getAddressFromPrivateKey2 = _interopRequireDefault(_getAddressFromPrivateKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function estimateGasForContractMethod(contractInterface, props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      privateKey = props.privateKey,
      method = props.method,
      args = props.args;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  var address = (0, _getAddressFromPrivateKey2.default)(privateKey);

  // Extend contract method args. Add transaction object as last argument
  var transactionObject = { from: address };
  args.push(transactionObject);

  return (0, _txUtils.getContractGasLimit)(contractInstance[method], args);
}