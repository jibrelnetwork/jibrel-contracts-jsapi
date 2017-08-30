import Promise from 'bluebird'
import EventEmitter from 'events'

const promiseTimeout = 1000 * 30

export function subscribe(Event, options = {}, callback) {
  const eventEmitter = new EventEmitter()

  /**
   * web3@0.x.x event takes filter and additional options in different params
   * web3@1.x.x event takes all options in one param
   */
  const { filter, ...additionalOptions } = options

  Event(filter, additionalOptions, (err, result) => {
    if (err) {
      eventEmitter.emit('error', err)

      if (callback) {
        callback(err)
      }

      return
    }

    eventEmitter.emit('data', result)

    if (callback) {
      callback(null, result)
    }
  })

  return eventEmitter
}

export function getPast(Event, options = {}) {
  /**
   * web3@0.x.x event takes filter and additional options in different params
   * web3@1.x.x event takes all options in one param
   */
  const { filter, ...additionalOptions } = options
  const event = Event(filter, additionalOptions)

  /**
   * event.get uses instance methods inside,
   * but bluebird promisify don't save context,
   * so need to bind to event object directly
   */
  return Promise
    .promisify(event.get.bind(event))()
    /**
     * If promise is not fulfilled or rejected within 30 sec timeout (in ms),
     * returned promise will be rejected
     */
    .timeout(promiseTimeout, new Error(`Can not get past events within ${promiseTimeout}ms`))
}
