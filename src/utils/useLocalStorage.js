const get = (key, shouldParse) => {
  const data = window.localStorage.getItem(key)
  if (shouldParse && data) return JSON.parse(data)
  return data
}
const update = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const create = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const remove = key => {
  window.localStorage.removeItem(key)
}
const reset = () => {
  window.localStorage.clear()
}
export const useLocalStorage = () => {
  return { update, get, create, remove, reset }
}
