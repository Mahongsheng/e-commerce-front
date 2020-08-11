import request from '@/utils/request'

// bvo

export function getOrderMangementData(params) {
  return request({
    url: '/vue-admin-template/table/list',
    // url: 'http://localhost:9030/bvoOrder/getSalBySaoId',
    method: 'get',
    params
  })
}

export function getSalBySaoid(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/bvoOrder/getSalBySaoId',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function getVosByDsrId(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/bvoOrder/getVosByDsrId',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function update(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/bvoOrder/update',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function getProBySao(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/getProBySao',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function sao(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/sao',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function shipment(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/shipment',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function getExpressFee(data) {
  // console.log(data)
  return request({
    url: 'http://localhost:9030/bvoOrder/getFeeByProvinceCode',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function updateStatus(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/bvoOrder/update',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

// mvo

export function mvoGetSalList(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/sao',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function sendExpress(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/shipment',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function cancal(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/cancel',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

export function deliver(data) {
  console.log(data)
  return request({
    url: 'http://localhost:9030/order/shipment',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data
  })
}

// 快递,跨域问题？？？
export function getExpressTrack(params) {
  return request({
    url: 'https://api.jisuapi.com/express/query',
    method: 'get',
    params
  })
}

export function baidu(params) {
  return request({
    url: 'https://www.baidu.com/s',
    method: 'get',
    // header:{
    //   'Bdpagetype': '3',
    //   'Bdqid': '0xd13fe66c0004880d',
    //   'Cache-Control': 'private',
    //   'Ckpacknum': 2,
    //   'Ckrndstr': 'c0004880d',
    //   'Connection': 'keep-alive',
    //   'Content-Encoding': 'gzip',
    //   'Content-Type': 'text/html;charset=utf-8',
    //   'Server': 'BWS/1.1',
    // },
    params
  })
}








