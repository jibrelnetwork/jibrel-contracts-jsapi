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