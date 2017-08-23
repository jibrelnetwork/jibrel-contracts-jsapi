'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.estimateGas = exports.Transfer = exports.getPastEvents = exports.allEvents = exports.transfer = exports.balanceOf = exports.totalSupply = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * ERC20API 'calling' methods
 */

var totalSupply = exports.totalSupply = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, contractInstance;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20Schemas.totalSupply);

          case 2:
            validatedProps = _context.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context.abrupt('return', _bluebird2.default.promisify(contractInstance.totalSupply.call)());

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function totalSupply(_x) {
    return _ref.apply(this, arguments);
  };
}();

var balanceOf = exports.balanceOf = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, owner, contractInstance;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20Schemas.balanceOf);

          case 2:
            validatedProps = _context2.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, owner = validatedProps.owner;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context2.abrupt('return', _bluebird2.default.promisify(contractInstance.balanceOf.call)(owner));

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function balanceOf(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * ERC20API 'transaction' methods
 */

var transfer = exports.transfer = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, privateKey, gasLimit, to, value, contractInstance;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20Schemas.transfer);

          case 2:
            validatedProps = _context3.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, privateKey = validatedProps.privateKey, gasLimit = validatedProps.gasLimit, to = validatedProps.to, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context3.abrupt('return', (0, _submitContractTx2.default)({
              privateKey: privateKey,
              gasLimit: gasLimit,
              args: [to, value],
              method: contractInstance.transfer
            }));

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function transfer(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * ERC20API events
 */

var allEvents = exports.allEvents = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, options, callback, contractInstance;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20Schemas.allEvents);

          case 2:
            validatedProps = _context4.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, options = validatedProps.options, callback = validatedProps.callback;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context4.abrupt('return', (0, _eventUtils.subscribeToContractEvent)(contractInstance.allEvents, options, callback));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function allEvents(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var getPastEvents = exports.getPastEvents = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, event, options, contractInstance;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20Schemas.getPastEvents);

          case 2:
            validatedProps = _context5.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, event = validatedProps.event, options = validatedProps.options;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context5.abrupt('return', (0, _eventUtils.getPastContractEvents)(contractInstance[event], options));

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function getPastEvents(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var Transfer = exports.Transfer = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, options, callback, contractInstance;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20Schemas.Transfer);

          case 2:
            validatedProps = _context6.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, options = validatedProps.options, callback = validatedProps.callback;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context6.abrupt('return', (0, _eventUtils.subscribeToContractEvent)(contractInstance.Transfer, options, callback));

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function Transfer(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Estimate gas for specific method call
 */

var estimateGas = exports.estimateGas = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(props) {
    var validatedProps;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20Schemas.estimateGas);

          case 2:
            validatedProps = _context7.sent;
            return _context7.abrupt('return', (0, _estimateGasForContractMethod2.default)(contractInterface, validatedProps));

          case 4:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function estimateGas(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

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

var _validationSchemas = require('./validationSchemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractInterface = 'ERC20';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.estimateGas = exports.isTransferFromAllowed = exports.isApprovedSpendingAllowed = exports.isApproveAllowed = exports.isTransferAllowed = exports.isSpendingAllowed = exports.isReceivingAllowed = exports.isRegulated = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * ERC20ValidatableAPI 'calling' methods
 */

var isRegulated = exports.isRegulated = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, contractInstance;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isRegulated);

          case 2:
            validatedProps = _context.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context.abrupt('return', _bluebird2.default.promisify(contractInstance.isRegulated.call)());

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function isRegulated(_x) {
    return _ref.apply(this, arguments);
  };
}();

var isReceivingAllowed = exports.isReceivingAllowed = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, account, value, contractInstance;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isReceivingAllowed);

          case 2:
            validatedProps = _context2.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, account = validatedProps.account, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context2.abrupt('return', _bluebird2.default.promisify(contractInstance.isReceivingAllowed.call)(account, value));

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function isReceivingAllowed(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var isSpendingAllowed = exports.isSpendingAllowed = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, account, value, contractInstance;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isSpendingAllowed);

          case 2:
            validatedProps = _context3.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, account = validatedProps.account, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context3.abrupt('return', _bluebird2.default.promisify(contractInstance.isSpendingAllowed.call)(account, value));

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function isSpendingAllowed(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var isTransferAllowed = exports.isTransferAllowed = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, from, to, value, contractInstance;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isTransferAllowed);

          case 2:
            validatedProps = _context4.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, from = validatedProps.from, to = validatedProps.to, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context4.abrupt('return', _bluebird2.default.promisify(contractInstance.isTransferAllowed.call)(from, to, value));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function isTransferAllowed(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var isApproveAllowed = exports.isApproveAllowed = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, from, spender, value, contractInstance;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isApproveAllowed);

          case 2:
            validatedProps = _context5.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, from = validatedProps.from, spender = validatedProps.spender, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context5.abrupt('return', _bluebird2.default.promisify(contractInstance.isApproveAllowed.call)(from, spender, value));

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function isApproveAllowed(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var isApprovedSpendingAllowed = exports.isApprovedSpendingAllowed = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, from, spender, value, contractInstance;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isApprovedSpendingAllowed);

          case 2:
            validatedProps = _context6.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, from = validatedProps.from, spender = validatedProps.spender, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context6.abrupt('return', _bluebird2.default.promisify(contractInstance.isApprovedSpendingAllowed.call)(from, spender, value));

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function isApprovedSpendingAllowed(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

var isTransferFromAllowed = exports.isTransferFromAllowed = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, spender, from, to, value, contractInstance;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isTransferFromAllowed);

          case 2:
            validatedProps = _context7.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, spender = validatedProps.spender, from = validatedProps.from, to = validatedProps.to, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context7.abrupt('return', _bluebird2.default.promisify(contractInstance.isTransferFromAllowed.call)(spender, from, to, value));

          case 7:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function isTransferFromAllowed(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Estimate gas for specific method call
 */

var estimateGas = exports.estimateGas = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(props) {
    var validatedProps;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.estimateGas);

          case 2:
            validatedProps = _context8.sent;
            return _context8.abrupt('return', (0, _estimateGasForContractMethod2.default)(contractInterface, validatedProps));

          case 4:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function estimateGas(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _initWeb = require('./utils/initWeb3');

var _initWeb2 = _interopRequireDefault(_initWeb);

var _getContractInstance = require('./utils/getContractInstance');

var _getContractInstance2 = _interopRequireDefault(_getContractInstance);

var _estimateGasForContractMethod = require('./utils/estimateGasForContractMethod');

var _estimateGasForContractMethod2 = _interopRequireDefault(_estimateGasForContractMethod);

var _validationSchemas = require('./validationSchemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractInterface = 'ERC20Validatable';
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.estimateGas = exports.getBalance = exports.sendTransaction = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var sendTransaction = exports.sendTransaction = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
    var validatedProps, rpcaddr, rpcport, otherProps;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ETHSchemas.sendTransaction);

          case 2:
            validatedProps = _context.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, otherProps = (0, _objectWithoutProperties3.default)(validatedProps, ['rpcaddr', 'rpcport']);


            (0, _initWeb2.default)(rpcaddr, rpcport);

            return _context.abrupt('return', (0, _submitTx2.default)(otherProps));

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function sendTransaction(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getBalance = exports.getBalance = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
    var validatedProps, rpcaddr, rpcport, address, defaultBlock;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ETHSchemas.getBalance);

          case 2:
            validatedProps = _context2.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, address = validatedProps.address, defaultBlock = validatedProps.defaultBlock;


            (0, _initWeb2.default)(rpcaddr, rpcport);

            return _context2.abrupt('return', _bluebird2.default.promisify(web3.eth.getBalance)(address, defaultBlock));

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getBalance(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var estimateGas = exports.estimateGas = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(props) {
    var validatedProps, rpcaddr, rpcport, data, to, value;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ETHSchemas.estimateGas);

          case 2:
            validatedProps = _context3.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, data = validatedProps.data, to = validatedProps.to, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);

            return _context3.abrupt('return', (0, _txUtils.getGasLimit)({ data: data, to: to, value: value }));

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function estimateGas(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _initWeb = require('./utils/initWeb3');

var _initWeb2 = _interopRequireDefault(_initWeb);

var _submitTx = require('./utils/submitTx');

var _submitTx2 = _interopRequireDefault(_submitTx);

var _txUtils = require('./utils/txUtils');

var _validationSchemas = require('./validationSchemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  if (contractInterface === 'ERC20') {
    return web3.eth.contract(ERC20ABI);
  } else if (contractInterface === 'ERC20Validatable') {
    return web3.eth.contract(ERC20ValidatableABI);
  }

  throw new Error('ABI for the contractInterface ' + contractInterface + ' not found');
}

var getContract = (0, _memoize2.default)(_getContract);

function _getContractInstance(contractAddress, contractInterface) {
  var contract = getContract(contractInterface);

  return contract.at(contractAddress);
}

var getContractInstance = (0, _memoize2.default)(_getContractInstance);

exports.default = getContractInstance;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
    var privateKey, gasLimit, data, to, value, address, rawTx, signedTx;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            privateKey = props.privateKey, gasLimit = props.gasLimit, data = props.data, to = props.to, value = props.value;
            address = (0, _getAddressFromPrivateKey2.default)(privateKey);
            _context.next = 4;
            return getRawTx({ gasLimit: gasLimit, address: address, data: data, to: to, value: value });

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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERC20ValidatableSchemas = exports.ERC20Schemas = exports.ETHSchemas = exports.validate = undefined;

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _ETHSchemas = require('./ETHSchemas');

var _ETHSchemas2 = _interopRequireDefault(_ETHSchemas);

var _ERC20Schemas = require('./ERC20Schemas');

var _ERC20Schemas2 = _interopRequireDefault(_ERC20Schemas);

var _ERC20ValidatableSchemas = require('./ERC20ValidatableSchemas');

var _ERC20ValidatableSchemas2 = _interopRequireDefault(_ERC20ValidatableSchemas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.validate = _validate2.default;
exports.ETHSchemas = _ETHSchemas2.default;
exports.ERC20Schemas = _ERC20Schemas2.default;
exports.ERC20ValidatableSchemas = _ERC20ValidatableSchemas2.default;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(props, schema) {
  return new _bluebird2.default(function (resolve, reject) {
    return _joiBrowser2.default.validate(props, schema, function (err, result) {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  }).catch(function (err) {
    throw new Error(err);
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validationRules = {
  host: _joiBrowser2.default.string().hostname(),
  port: _joiBrowser2.default.number().integer().min(1).max(65535),
  address: _joiBrowser2.default.string().regex(/^[a-zA-Z0-9]+$/).length(42),
  privateKey: _joiBrowser2.default.string().alphanum().length(64),
  value: _joiBrowser2.default.number().positive(),
  event: _joiBrowser2.default.string().min(1).max(999),
  method: _joiBrowser2.default.string().min(1).max(999),
  args: _joiBrowser2.default.array(),
  data: _joiBrowser2.default.string().regex(/^[a-zA-Z0-9]+$/).max(9999),
  gasLimit: _joiBrowser2.default.number().positive(),
  callback: _joiBrowser2.default.func(),
  eventOptions: _joiBrowser2.default.object().keys({
    filter: _joiBrowser2.default.object(),
    fromBlock: [_joiBrowser2.default.number().integer().positive(), _joiBrowser2.default.string().min(6).max(7)],
    toBlock: [_joiBrowser2.default.number().integer().positive(), _joiBrowser2.default.string().min(6).max(7)],
    address: _joiBrowser2.default.string().regex(/^[a-zA-Z0-9]+$/).length(42),
    topics: _joiBrowser2.default.array()
  })
};

exports.default = validationRules;
