import request from '@/utils/request'

export function getBVOInfo(getBVOInfoVO){
  return request({
    url: 'http://localhost:9020/bvoInfo/getInfo',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getBVOInfoVO
  })
}

export function initBVOInfo(initBVOVO){
  return request({
    url: 'http://localhost:9020/bvoInfo/initBVOInfo',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: initBVOBVO
  })
}

export function updateBVOInfo(BVOUpdateVO){
  return request({
    url: 'http://localhost:9020/bvoInfo/updateBVOInfo',
    method: 'patch',
    data: BVOUpdateVO
  })
}
