'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.estimateGas = exports.isTransferFromAllowed = exports.isApprovedSpendingAllowed = exports.isApproveAllowed = exports.isTransferAllowed = exports.isSpendingAllowed = exports.isReceivingAllowed = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * ERC20ValidatableAPI 'calling' methods
 */

var isReceivingAllowed = exports.isReceivingAllowed = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, account, value, contractInstance;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isReceivingAllowed);

          case 2:
            validatedProps = _context.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, account = validatedProps.account, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context.abrupt('return', _bluebird2.default.promisify(contractInstance.isReceivingAllowed.call)(account, value));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function isReceivingAllowed(_x) {
    return _ref.apply(this, arguments);
  };
}();

var isSpendingAllowed = exports.isSpendingAllowed = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, account, value, contractInstance;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isSpendingAllowed);

          case 2:
            validatedProps = _context2.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, account = validatedProps.account, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context2.abrupt('return', _bluebird2.default.promisify(contractInstance.isSpendingAllowed.call)(account, value));

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function isSpendingAllowed(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var isTransferAllowed = exports.isTransferAllowed = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, from, to, value, contractInstance;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isTransferAllowed);

          case 2:
            validatedProps = _context3.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, from = validatedProps.from, to = validatedProps.to, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context3.abrupt('return', _bluebird2.default.promisify(contractInstance.isTransferAllowed.call)(from, to, value));

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function isTransferAllowed(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var isApproveAllowed = exports.isApproveAllowed = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, from, spender, value, contractInstance;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isApproveAllowed);

          case 2:
            validatedProps = _context4.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, from = validatedProps.from, spender = validatedProps.spender, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context4.abrupt('return', _bluebird2.default.promisify(contractInstance.isApproveAllowed.call)(from, spender, value));

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function isApproveAllowed(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var isApprovedSpendingAllowed = exports.isApprovedSpendingAllowed = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, from, spender, value, contractInstance;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isApprovedSpendingAllowed);

          case 2:
            validatedProps = _context5.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, from = validatedProps.from, spender = validatedProps.spender, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context5.abrupt('return', _bluebird2.default.promisify(contractInstance.isApprovedSpendingAllowed.call)(from, spender, value));

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function isApprovedSpendingAllowed(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var isTransferFromAllowed = exports.isTransferFromAllowed = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(props) {
    var validatedProps, rpcaddr, rpcport, contractAddress, spender, from, to, value, contractInstance;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.isTransferFromAllowed);

          case 2:
            validatedProps = _context6.sent;
            rpcaddr = validatedProps.rpcaddr, rpcport = validatedProps.rpcport, contractAddress = validatedProps.contractAddress, spender = validatedProps.spender, from = validatedProps.from, to = validatedProps.to, value = validatedProps.value;


            (0, _initWeb2.default)(rpcaddr, rpcport);
            contractInstance = (0, _getContractInstance2.default)(contractAddress, contractInterface);
            return _context6.abrupt('return', _bluebird2.default.promisify(contractInstance.isTransferFromAllowed.call)(spender, from, to, value));

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function isTransferFromAllowed(_x6) {
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
            return (0, _validationSchemas.validate)(props, _validationSchemas.ERC20ValidatableSchemas.estimateGas);

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

var _getContractInstance = require('./utils/getContractInstance');

var _getContractInstance2 = _interopRequireDefault(_getContractInstance);

var _estimateGasForContractMethod = require('./utils/estimateGasForContractMethod');

var _estimateGasForContractMethod2 = _interopRequireDefault(_estimateGasForContractMethod);

var _validationSchemas = require('./validationSchemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractInterface = 'ERC20Validatable';