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