import Cookies from 'js-cookie'

const TokenKey = 'e_commerce_token'
const UserName = 'e_commerce_username'

export function getUserName(){
  return Cookies.get(UserName)
}

export function setUserName(name){
  return Cookies.set(UserName, name)
}

export function removeUserName(){
  return Cookies.remove(UserName)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
