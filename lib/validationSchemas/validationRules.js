'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validationRules = {
  host: _joiBrowser2.default.string(),
  port: _joiBrowser2.default.number().integer().min(1).max(65535),
  address: _joiBrowser2.default.string().regex(/^[a-zA-Z0-9]+$/).length(42),
  privateKey: _joiBrowser2.default.string().alphanum().length(64),
  value: _joiBrowser2.default.number().positive(),
  event: _joiBrowser2.default.string().min(1).max(999),
  method: _joiBrowser2.default.string().min(1).max(999),
  args: _joiBrowser2.default.array(),
  data: _joiBrowser2.default.string().regex(/^[a-zA-Z0-9]+$/).max(9999),
  gasLimit: _joiBrowser2.default.number().positive(),
  nonce: _joiBrowser2.default.number().integer().min(0),
  options: _joiBrowser2.default.object(),
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