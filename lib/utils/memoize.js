export default function memoize(fn) {
  const cache = {}

  return (key) => {
    if (key in cache) {
      return cache[key]
    }

    const value = fn(key)
    cache[key] = value

    return value
  }
}
