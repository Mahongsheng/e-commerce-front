import request from '@/utils/request'

export function walletRegister(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9050/wallet/register',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function getAvailableMoney(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9050/wallet/getInfo',
    method: 'post',
    data
  })
}

export function getTransactionRecord(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9050/walletFlow/check',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function withDrawMoney(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9050/walletFlow/withdraw',
    method: 'patch',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },    data
  })
}
export function depositMoney(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9050/walletFlow/deposit',
    method: 'patch',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function changePassword(data) {
  console.log('changePassword');
  console.log(data)
  return request({
    url: 'http://localhost:9050/wallet/changePassword',
    method: 'patch',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function pay(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9050/walletFlow/pay',
    method: 'patch',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function getAdminFlow(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9010/walletAdmin/getAllFlow',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function audit(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9010/walletAdmin/audit',
    method: 'patch',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}




