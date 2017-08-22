export function checkParamNumber(param, paramName, minValue = 0, exactNumber = 0) {
  const isExist = (param != null)
  const isNumber = (typeof param === 'number')
  const isBigEnough = (param > minValue)
  const isExactValue = exactNumber ? (param === exactNumber) : true

  if (!(isExist && isNumber && isBigEnough && isExactValue)) {
    throw (new Error(`${paramName} is not found or invalid`))
  }
}

export function checkParamStr(param, paramName, minLength = 0, exactLength = 0) {
  const isExist = (param != null)
  const isString = (typeof param === 'string')
  const isLongEnough = (param.length > minLength)
  const isExactLength = exactLength ? (param.length === exactLength) : true

  if (!(isExist && isString && isLongEnough && isExactLength)) {
    throw (new Error(`${paramName} is not found or invalid`))
  }
}

export function checkParamObject(param, paramName, requiredFields = []) {
  const isExist = (param != null)
  const isObject = (typeof param === 'object')

  if (!(isExist && isObject)) {
    throw (new Error(`${paramName} is not found or invalid`))
  }

  requiredFields.forEach((key) => {
    if (param[key] == null) {
      throw (new Error(`Required field ${key} of ${paramName} is not found`))
    }
  })
}

export function checkParamArray(param, paramName, minLength = 0) {
  checkParamObject(param, paramName)

  const isArray = Array.isArray(param)
  const isLongEnough = (param.length > minLength)

  if (!(isArray && isLongEnough)) {
    throw (new Error(`${paramName} is not found or invalid`))
  }
}

export function checkParamFunction(param, paramName) {
  const isExist = (param != null)
  const isFunction = (typeof param === 'function')

  if (!(isExist && isFunction)) {
    throw (new Error(`${paramName} is not found or invalid`))
  }
}

export function checkParamAddress(address) {
  if (!web3.isAddress(address)) {
    throw (new Error('Provided address is invalid'))
  }
}

export function checkParamPrivateKey(privateKey) {
  checkParamStr(privateKey, 'privateKey', 0, 64)

  const privateKeyLowRe = /^[a-z0-9]+$/
  const privateKeyUppRe = /^[A-Z0-9]+$/

  if (!(privateKeyLowRe.test(privateKey) || privateKeyUppRe.test(privateKey))) {
    throw (new Error('Private key has invalid format'))
  }
}
