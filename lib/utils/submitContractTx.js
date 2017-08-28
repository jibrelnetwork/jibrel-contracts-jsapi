'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getRawTx = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(method, args, address, gasLimit) {
    var txData, gasPrice;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            txData = method.getData.apply(method, (0, _toConsumableArray3.default)(args));
            _context2.next = 3;
            return (0, _txUtils.getGasPrice)();

          case 3:
            gasPrice = _context2.sent;
            _context2.t0 = txData;
            _context2.t1 = gasPrice.toNumber();
            _context2.next = 8;
            return (0, _txUtils.getTxCount)(address);

          case 8:
            _context2.t2 = _context2.sent;

            if (!(gasLimit != null)) {
              _context2.next = 13;
              break;
            }

            _context2.t3 = gasLimit;
            _context2.next = 16;
            break;

          case 13:
            _context2.next = 15;
            return (0, _txUtils.getContractGasLimit)(method, args);

          case 15:
            _context2.t3 = _context2.sent;

          case 16:
            _context2.t4 = _context2.t3;
            return _context2.abrupt('return', {
              data: _context2.t0,
              gasPrice: _context2.t1,
              nonce: _context2.t2,
              gasLimit: _context2.t4
            });

          case 18:
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
    var address, transactionObject, rawTx, signedTx;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            address = (0, _getAddressFromPrivateKey2.default)(privateKey);

            // Extend contract method args. Add transaction object as last argument

            transactionObject = { from: address };

            args.push(transactionObject);

            _context.next = 5;
            return getRawTx(method, args, address, gasLimit);

          case 5:
            rawTx = _context.sent;
            signedTx = (0, _signTx2.default)(rawTx, privateKey);
            return _context.abrupt('return', _bluebird2.default.promisify(web3.eth.sendRawTransaction)(signedTx));

          case 8:
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