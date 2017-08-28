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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function estimateGasForContractMethod(contractInterface, props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      method = props.method,
      args = props.args;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  return (0, _txUtils.getContractGasLimit)(contractInstance[method], args);
}