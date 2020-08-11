import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://localhost:9010/log/login',
    method: 'post',
    data
  })
}

export function getInfo(user) {
  return request({
    url: 'http://localhost:9010/user/currentInfo',
    method: 'get',
    headers: {
      Authorization: user.token
    },
    params: {
      userName :user.userName
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function generateValidateCode() {
  return request({
    url: 'http://localhost:9010/log/generateValidateCode',
    method: 'get'
  })
}