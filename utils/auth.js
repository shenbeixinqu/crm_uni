import Cookies from 'js-cookie'

const TokenKey = 'crm_pangu_token'
const MainKey = 'crm_pangu_'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCd(key) {
  return Cookies.get(MainKey + key)
}

export function setCd(key, value) {
  return Cookies.set(MainKey + key, value)
}

export function removeCd(key) {
  return Cookies.remove(MainKey + key)
}
