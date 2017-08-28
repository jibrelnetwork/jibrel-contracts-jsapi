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
    var gasPrice;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _txUtils.getGasPrice)();

          case 2:
            gasPrice = _context2.sent;
            _context2.t0 = data;
            _context2.t1 = to;
            _context2.t2 = value;
            _context2.t3 = gasPrice.toNumber();
            _context2.next = 9;
            return (0, _txUtils.getTxCount)(address);

          case 9:
            _context2.t4 = _context2.sent;

            if (!(gasLimit != null)) {
              _context2.next = 14;
              break;
            }

            _context2.t5 = gasLimit;
            _context2.next = 17;
            break;

          case 14:
            _context2.next = 16;
            return (0, _txUtils.getGasLimit)({ data: data, to: to, value: value });

          case 16:
            _context2.t5 = _context2.sent;

          case 17:
            _context2.t6 = _context2.t5;
            return _context2.abrupt('return', {
              data: _context2.t0,
              to: _context2.t1,
              value: _context2.t2,
              gasPrice: _context2.t3,
              nonce: _context2.t4,
              gasLimit: _context2.t6
            });

          case 19:
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
            signedTx = (0, _signTx2.default)(rawTx, privateKey);
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