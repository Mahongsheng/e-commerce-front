import request from '@/utils/request'

export function getAllPar(getAllParVO) {
  return request({
    url: 'http://localhost:9010/parameter/getAllParInfo',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getAllParVO
  })
}

export function searchPar(searchParVO) {
  return request({
    url: 'http://localhost:9010/parameter/searchPar',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: searchParVO
  })
}

export function addPar(addParVO){
  return request({
    url: 'http://localhost:9010/parameter/addParameter',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addParVO
  })
}

export function deletePar(parId){
  return request({
    url: 'http://localhost:9010/parameter/deletePar',
    method: 'delete',
    params: parId
  })
}

export function batchDeletePar(parIds){
  return request({
    url: 'http://localhost:9010/parameter/batchDeletePar',
    method: 'post',
    data: parIds
  })
}

export function getParWhenUpdate(parId){
  return request({
    url: 'http://localhost:9010/parameter/getParWhenUpdate',
    method: 'get',
    params: parId
  })
}
export function updatePar(updateParVO){
  return request({
    url: 'http://localhost:9010/parameter/updatePar',
    method: 'post',
    data: updateParVO
  })
}
