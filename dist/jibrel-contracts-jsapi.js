'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalSupply = totalSupply;
exports.balanceOf = balanceOf;
exports.transfer = transfer;
exports.allEvents = allEvents;
exports.getPastEvents = getPastEvents;
exports.Transfer = Transfer;
exports.estimateGas = estimateGas;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _initWeb = require('./utils/initWeb3');

var _initWeb2 = _interopRequireDefault(_initWeb);

var _submitContractTx = require('./utils/submitContractTx');

var _submitContractTx2 = _interopRequireDefault(_submitContractTx);

var _getContractInstance = require('./utils/getContractInstance');

var _getContractInstance2 = _interopRequireDefault(_getContractInstance);

var _estimateGasForContractMethod = require('./utils/estimateGasForContractMethod');

var _estimateGasForContractMethod2 = _interopRequireDefault(_estimateGasForContractMethod);

var _eventUtils = require('./utils/eventUtils');

var _checkParam = require('./utils/checkParam');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractInterface = 'ERC20';

/**
 * ERC20API 'calling' methods
 */

function totalSupply(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  return _bluebird2.default.promisify(contractInstance.totalSupply.call)();
}

function balanceOf(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      owner = props.owner;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamAddress)(owner);

  return _bluebird2.default.promisify(contractInstance.balanceOf.call)(owner);
}

/**
 * ERC20API 'transaction' methods
 */

function transfer(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      privateKey = props.privateKey,
      gasLimit = props.gasLimit,
      to = props.to,
      value = props.value;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamPrivateKey)(privateKey);
  (0, _checkParam.checkParamNumber)(gasLimit, 'gasLimit');
  (0, _checkParam.checkParamAddress)(to);
  (0, _checkParam.checkParamNumber)(value, 'value');

  return (0, _submitContractTx2.default)({
    privateKey: privateKey,
    gasLimit: gasLimit,
    args: [to, value],
    method: contractInstance.transfer
  });
}

/**
 * ERC20API events
 */

function allEvents(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      options = props.options,
      callback = props.callback;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  // options param is optional
  if (options != null) {
    (0, _checkParam.checkParamObject)(options, 'options', ['filter']);
  }

  // callback param is optional
  if (callback != null) {
    (0, _checkParam.checkParamFunction)(callback, 'callback');
  }

  return (0, _eventUtils.subscribeToContractEvent)(contractInstance.allEvents, options, callback);
}

function getPastEvents(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      event = props.event,
      options = props.options;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamStr)(event, 'event');

  // options param is optional
  if (options != null) {
    (0, _checkParam.checkParamObject)(options, 'options', ['filter']);
  }

  return (0, _eventUtils.getPastContractEvents)(contractInstance[event], options);
}

function Transfer(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      options = props.options,
      callback = props.callback;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  // options param is optional
  if (options != null) {
    (0, _checkParam.checkParamObject)(options, 'options', ['filter']);
  }

  // callback param is optional
  if (callback != null) {
    (0, _checkParam.checkParamFunction)(callback, 'callback');
  }

  return (0, _eventUtils.subscribeToContractEvent)(contractInstance.Transfer, options, callback);
}

/**
 * Estimate gas for specific method call
 */

function estimateGas(props) {
  return (0, _estimateGasForContractMethod2.default)(contractInterface, props);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRegulated = isRegulated;
exports.isReceivingAllowed = isReceivingAllowed;
exports.isSpendingAllowed = isSpendingAllowed;
exports.isTransferAllowed = isTransferAllowed;
exports.isApproveAllowed = isApproveAllowed;
exports.isApprovedSpendingAllowed = isApprovedSpendingAllowed;
exports.isTransferFromAllowed = isTransferFromAllowed;
exports.estimateGas = estimateGas;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _initWeb = require('./utils/initWeb3');

var _initWeb2 = _interopRequireDefault(_initWeb);

var _getContractInstance = require('./utils/getContractInstance');

var _getContractInstance2 = _interopRequireDefault(_getContractInstance);

var _checkParam = require('./utils/checkParam');

var _estimateGasForContractMethod = require('./utils/estimateGasForContractMethod');

var _estimateGasForContractMethod2 = _interopRequireDefault(_estimateGasForContractMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractInterface = 'ERC20Validatable';

/**
 * ERC20ValidatableAPI 'calling' methods
 */

function isRegulated(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  return _bluebird2.default.promisify(contractInstance.isRegulated.call)();
}

function isReceivingAllowed(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      account = props.account,
      value = props.value;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamAddress)(account);
  (0, _checkParam.checkParamNumber)(value, 'value');

  return _bluebird2.default.promisify(contractInstance.isReceivingAllowed.call)(account, value);
}

function isSpendingAllowed(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      account = props.account,
      value = props.value;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamAddress)(account);
  (0, _checkParam.checkParamNumber)(value, 'value');

  return _bluebird2.default.promisify(contractInstance.isSpendingAllowed.call)(account, value);
}

function isTransferAllowed(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      from = props.from,
      to = props.to,
      value = props.value;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamAddress)(from);
  (0, _checkParam.checkParamAddress)(to);
  (0, _checkParam.checkParamNumber)(value, 'value');

  return _bluebird2.default.promisify(contractInstance.isTransferAllowed.call)(from, to, value);
}

function isApproveAllowed(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      from = props.from,
      spender = props.spender,
      value = props.value;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamAddress)(from);
  (0, _checkParam.checkParamAddress)(spender);
  (0, _checkParam.checkParamNumber)(value, 'value');

  return _bluebird2.default.promisify(contractInstance.isApproveAllowed.call)(from, spender, value);
}

function isApprovedSpendingAllowed(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      from = props.from,
      spender = props.spender,
      value = props.value;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamAddress)(from);
  (0, _checkParam.checkParamAddress)(spender);
  (0, _checkParam.checkParamNumber)(value, 'value');

  return _bluebird2.default.promisify(contractInstance.isApprovedSpendingAllowed.call)(from, spender, value);
}

function isTransferFromAllowed(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      spender = props.spender,
      from = props.from,
      to = props.to,
      value = props.value;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamAddress)(spender);
  (0, _checkParam.checkParamAddress)(from);
  (0, _checkParam.checkParamAddress)(to);
  (0, _checkParam.checkParamNumber)(value, 'value');

  return _bluebird2.default.promisify(contractInstance.isTransferFromAllowed.call)(spender, from, to, value);
}

/**
 * Estimate gas for specific method call
 */

function estimateGas(props) {
  return (0, _estimateGasForContractMethod2.default)(contractInterface, props);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.sendTransaction = sendTransaction;
exports.getBalance = getBalance;
exports.estimateGas = estimateGas;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _initWeb = require('./utils/initWeb3');

var _initWeb2 = _interopRequireDefault(_initWeb);

var _submitTx = require('./utils/submitTx');

var _submitTx2 = _interopRequireDefault(_submitTx);

var _txUtils = require('./utils/txUtils');

var _checkParam = require('./utils/checkParam');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sendTransaction(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      otherProps = (0, _objectWithoutProperties3.default)(props, ['rpcaddr', 'rpcport']);


  (0, _initWeb2.default)(rpcaddr, rpcport);

  return (0, _submitTx2.default)(otherProps);
}

function getBalance(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      address = props.address,
      defaultBlock = props.defaultBlock;


  (0, _initWeb2.default)(rpcaddr, rpcport);

  (0, _checkParam.checkParamAddress)(address);
  (0, _checkParam.checkParamAddress)(defaultBlock);

  return _bluebird2.default.promisify(web3.eth.getBalance)(address, defaultBlock);
}

function estimateGas(props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      data = props.data,
      to = props.to,
      value = props.value;


  (0, _initWeb2.default)(rpcaddr, rpcport);

  (0, _checkParam.checkParamStr)(data, 'data');
  (0, _checkParam.checkParamAddress)(to);
  (0, _checkParam.checkParamNumber)(value, 'value');

  return (0, _txUtils.getGasLimit)({ data: data, to: to, value: value });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.checkParamNumber = checkParamNumber;
exports.checkParamStr = checkParamStr;
exports.checkParamObject = checkParamObject;
exports.checkParamArray = checkParamArray;
exports.checkParamFunction = checkParamFunction;
exports.checkParamAddress = checkParamAddress;
exports.checkParamPrivateKey = checkParamPrivateKey;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkParamNumber(param, paramName) {
  var minValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var exactNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var isExist = param != null;
  var isNumber = typeof param === 'number';
  var isBigEnough = param > minValue;
  var isExactValue = exactNumber ? param === exactNumber : true;

  if (!(isExist && isNumber && isBigEnough && isExactValue)) {
    throw new Error(paramName + ' is not found or invalid');
  }
}

function checkParamStr(param, paramName) {
  var minLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var exactLength = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var isExist = param != null;
  var isString = typeof param === 'string';
  var isLongEnough = param.length > minLength;
  var isExactLength = exactLength ? param.length === exactLength : true;

  if (!(isExist && isString && isLongEnough && isExactLength)) {
    throw new Error(paramName + ' is not found or invalid');
  }
}

function checkParamObject(param, paramName) {
  var requiredFields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var isExist = param != null;
  var isObject = (typeof param === 'undefined' ? 'undefined' : (0, _typeof3.default)(param)) === 'object';

  if (!(isExist && isObject)) {
    throw new Error(paramName + ' is not found or invalid');
  }

  requiredFields.forEach(function (key) {
    if (param[key] == null) {
      throw new Error('Required field ' + key + ' of ' + paramName + ' is not found');
    }
  });
}

function checkParamArray(param, paramName) {
  var minLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  checkParamObject(param, paramName);

  var isArray = Array.isArray(param);
  var isLongEnough = param.length > minLength;

  if (!(isArray && isLongEnough)) {
    throw new Error(paramName + ' is not found or invalid');
  }
}

function checkParamFunction(param, paramName) {
  var isExist = param != null;
  var isFunction = typeof param === 'function';

  if (!(isExist && isFunction)) {
    throw new Error(paramName + ' is not found or invalid');
  }
}

function checkParamAddress(address) {
  if (!web3.isAddress(address)) {
    throw new Error('Provided address is invalid');
  }
}

function checkParamPrivateKey(privateKey) {
  checkParamStr(privateKey, 'privateKey', 0, 64);

  var privateKeyLowRe = /^[a-z0-9]+$/;
  var privateKeyUppRe = /^[A-Z0-9]+$/;

  if (!(privateKeyLowRe.test(privateKey) || privateKeyUppRe.test(privateKey))) {
    throw new Error('Private key has invalid format');
  }
}
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

var _checkParam = require('./checkParam');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function estimateGasForContractMethod(contractInterface, props) {
  var rpcaddr = props.rpcaddr,
      rpcport = props.rpcport,
      contractAddress = props.contractAddress,
      method = props.method,
      args = props.args;


  (0, _initWeb2.default)(rpcaddr, rpcport);
  var contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);

  (0, _checkParam.checkParamStr)(method, 'method');
  (0, _checkParam.checkParamArray)(args, 'args');

  return (0, _txUtils.getContractGasLimit)(contractInstance[method], null, args);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.subscribeToContractEvent = subscribeToContractEvent;
exports.getPastContractEvents = getPastContractEvents;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function subscribeToContractEvent(Event, options, callback) {
  var contractEventEmitter = new _events2.default();

  /**
   * web3@0.x.x event takes filter and additional options in different params
   * web3@1.x.x event takes all options in one param
   */
  var filter = options.filter,
      additionalOptions = (0, _objectWithoutProperties3.default)(options, ['filter']);


  Event(filter, additionalOptions, function (err, result) {
    if (err) {
      contractEventEmitter.emit('error', err);
      callback(err);

      return;
    }

    contractEventEmitter.emit('data', result);
    callback(null, result);
  });

  return contractEventEmitter;
}

function getPastContractEvents(Event, options) {
  /**
   * web3@0.x.x event takes filter and additional options in different params
   * web3@1.x.x event takes all options in one param
   */
  var filter = options.filter,
      additionalOptions = (0, _objectWithoutProperties3.default)(options, ['filter']);

  var event = Event(filter, additionalOptions);

  return _bluebird2.default.promisify(event.get)();
}
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

  return address;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _memoize = require('./memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _checkParam = require('./checkParam');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ERC20ABI = [{
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'approve',
  outputs: [{
    name: 'success',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'totalSupply',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transferFrom',
  outputs: [{
    name: 'success',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }],
  name: 'balanceOf',
  outputs: [{
    name: 'balance',
    type: 'uint256'
  }],
  payable: false,
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transfer',
  outputs: [{
    name: 'success',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }],
  name: 'allowance',
  outputs: [{
    name: 'remaining',
    type: 'uint256'
  }],
  payable: false,
  type: 'function'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'from',
    type: 'address'
  }, {
    indexed: true,
    name: 'to',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Transfer',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address'
  }, {
    indexed: true,
    name: 'spender',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Approval',
  type: 'event'
}];
var ERC20ValidatableABI = [{
  constant: true,
  inputs: [{
    name: '_account',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isReceivingAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isTransferFromAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_account',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isSpendingAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isApproveAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isApprovedSpendingAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'isTransferAllowed',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  type: 'function'
}];


function _getContract(contractInterface) {
  (0, _checkParam.checkParamStr)(contractInterface, 'contractInterface');

  if (contractInterface === 'ERC20') {
    return web3.eth.contract(ERC20ABI);
  } else if (contractInterface === 'ERC20Validatable') {
    return web3.eth.contract(ERC20ValidatableABI);
  }

  throw new Error('ABI for the contractInterface ' + contractInterface + ' not found');
}

var getContract = (0, _memoize2.default)(_getContract);

function _getContractInstance(contractAddress, contractInterface) {
  (0, _checkParam.checkParamAddress)(contractAddress);

  var contract = getContract(contractInterface);

  return contract.at(contractAddress);
}

var getContractInstance = (0, _memoize2.default)(_getContractInstance);

exports.default = getContractInstance;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = initWeb3;

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _checkParam = require('./checkParam');

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
  checkWeb3ConnectionParams({ rpcaddr: rpcaddr, rpcport: rpcport });

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

function checkWeb3ConnectionParams(params) {
  (0, _keys2.default)(params).forEach(function (key) {
    return (0, _checkParam.checkParamStr)(key, params[key]);
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memoize;
function memoize(fn) {
  var cache = {};

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var key = args.join(':');

    if (key in cache) {
      return cache[key];
    }

    var value = fn.apply(undefined, args);
    cache[key] = value;

    return value;
  };
}
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getRawTx = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(method, txData, address, gasLimit) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = txData;
            _context2.next = 3;
            return (0, _txUtils.getGasPrice)();

          case 3:
            _context2.t1 = _context2.sent;
            _context2.next = 6;
            return (0, _txUtils.getTxCount)(address);

          case 6:
            _context2.t2 = _context2.sent;

            if (!(gasLimit != null)) {
              _context2.next = 11;
              break;
            }

            _context2.t3 = gasLimit;
            _context2.next = 14;
            break;

          case 11:
            _context2.next = 13;
            return (0, _txUtils.getContractGasLimit)(method, txData);

          case 13:
            _context2.t3 = _context2.sent;

          case 14:
            _context2.t4 = _context2.t3;
            return _context2.abrupt('return', {
              data: _context2.t0,
              gasPrice: _context2.t1,
              nonce: _context2.t2,
              gasLimit: _context2.t4
            });

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getRawTx(_x2, _x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _signTx = require('./signTx');

var _signTx2 = _interopRequireDefault(_signTx);

var _txUtils = require('./txUtils');

var _getAddressFromPrivateKey = require('./getAddressFromPrivateKey');

var _getAddressFromPrivateKey2 = _interopRequireDefault(_getAddressFromPrivateKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var method = _ref2.method,
        args = _ref2.args,
        privateKey = _ref2.privateKey,
        gasLimit = _ref2.gasLimit;
    var txData, address, rawTx, signedTx;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            txData = method.getData.apply(method, (0, _toConsumableArray3.default)(args));
            address = (0, _getAddressFromPrivateKey2.default)(privateKey);
            _context.next = 4;
            return getRawTx(method, txData, address, gasLimit);

          case 4:
            rawTx = _context.sent;
            signedTx = (0, _signTx2.default)(privateKey, rawTx);
            return _context.abrupt('return', _bluebird2.default.promisify(web3.eth.sendRawTransaction)(signedTx));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function submitContractTx(_x) {
    return _ref.apply(this, arguments);
  }

  return submitContractTx;
}();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getRawTx = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
    var gasLimit = _ref3.gasLimit,
        address = _ref3.address,
        data = _ref3.data,
        to = _ref3.to,
        value = _ref3.value;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = data;
            _context2.t1 = to;
            _context2.t2 = value;
            _context2.next = 5;
            return (0, _txUtils.getGasPrice)();

          case 5:
            _context2.t3 = _context2.sent;
            _context2.next = 8;
            return (0, _txUtils.getTxCount)(address);

          case 8:
            _context2.t4 = _context2.sent;

            if (!(gasLimit != null)) {
              _context2.next = 13;
              break;
            }

            _context2.t5 = gasLimit;
            _context2.next = 16;
            break;

          case 13:
            _context2.next = 15;
            return (0, _txUtils.getGasLimit)({ data: data, to: to, value: value });

          case 15:
            _context2.t5 = _context2.sent;

          case 16:
            _context2.t6 = _context2.t5;
            return _context2.abrupt('return', {
              data: _context2.t0,
              to: _context2.t1,
              value: _context2.t2,
              gasPrice: _context2.t3,
              nonce: _context2.t4,
              gasLimit: _context2.t6
            });

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getRawTx(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _signTx = require('./signTx');

var _signTx2 = _interopRequireDefault(_signTx);

var _txUtils = require('./txUtils');

var _getAddressFromPrivateKey = require('./getAddressFromPrivateKey');

var _getAddressFromPrivateKey2 = _interopRequireDefault(_getAddressFromPrivateKey);

var _checkParam = require('./checkParam');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
    var privateKey, gasLimit, data, to, value, address, rawTx, signedTx;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            privateKey = props.privateKey, gasLimit = props.gasLimit, data = props.data, to = props.to, value = props.value;


            (0, _checkParam.checkParamAddress)(to);
            (0, _checkParam.checkParamPrivateKey)(privateKey);
            (0, _checkParam.checkParamStr)(data, 'data');
            (0, _checkParam.checkParamNumber)(value, 'value');
            (0, _checkParam.checkParamNumber)(gasLimit, 'gasLimit');

            address = (0, _getAddressFromPrivateKey2.default)(privateKey);
            _context.next = 9;
            return getRawTx({ gasLimit: gasLimit, address: address, data: data, to: to, value: value });

          case 9:
            rawTx = _context.sent;
            signedTx = (0, _signTx2.default)(privateKey, rawTx);
            return _context.abrupt('return', _bluebird2.default.promisify(web3.eth.sendRawTransaction)(signedTx));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function submitTx(_x) {
    return _ref.apply(this, arguments);
  }

  return submitTx;
}();
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

function getContractGasLimit(method, txData, args) {
  var data = txData && txData.length ? txData : method.getData.apply(method, (0, _toConsumableArray3.default)(args));

  return _bluebird2.default.promisify(method.estimateGas)({ data: data });
}
