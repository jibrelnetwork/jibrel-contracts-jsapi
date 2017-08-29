import Promise from 'bluebird'
import EventEmitter from 'events'

export function subscribeToContractEvent(Event, options = {}, callback) {
  const contractEventEmitter = new EventEmitter()

  /**
   * web3@0.x.x event takes filter and additional options in different params
   * web3@1.x.x event takes all options in one param
   */
  const { filter, ...additionalOptions } = options

  Event(filter, additionalOptions, (err, result) => {
    if (err) {
      contractEventEmitter.emit('error', err)

      if (callback) {
        callback(err)
      }

      return
    }

    contractEventEmitter.emit('data', result)

    if (callback) {
      callback(null, result)
    }
  })

  return contractEventEmitter
}

export function getPastContractEvents(Event, options = {}) {
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
  return Promise.promisify(event.get.bind(event))()
}
