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

function subscribeToContractEvent(Event) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var callback = arguments[2];

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

function getPastContractEvents(Event) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  /**
   * web3@0.x.x event takes filter and additional options in different params
   * web3@1.x.x event takes all options in one param
   */
  var filter = options.filter,
      additionalOptions = (0, _objectWithoutProperties3.default)(options, ['filter']);

  var event = Event(filter, additionalOptions);

  return _bluebird2.default.promisify(event.get)();
}