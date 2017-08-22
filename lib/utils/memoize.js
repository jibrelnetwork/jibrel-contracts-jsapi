export default function memoize(fn) {
  const cache = {}

  return (...args) => {
    const key = args.join(':')

    if (key in cache) {
      return cache[key]
    }

    const value = fn(...args)
    cache[key] = value

    return value
  }
}
