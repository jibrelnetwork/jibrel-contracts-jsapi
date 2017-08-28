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