import request from '@/utils/request'

export function getStores(getStoreVO){
  return request({
    url: 'http://localhost:9020/store/getStores',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getStoreVO
  })
}

export function addStore(addStoreVO){
  return request({
    url: 'http://localhost:9020/store/insertStr',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addStoreVO
  })
}

export function addEba(EbaVO){
  return request({
    url: 'http://localhost:9020/store/insertEba',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: EbaVO
  })
}
