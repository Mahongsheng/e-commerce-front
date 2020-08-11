import request from '@/utils/request'

export function getAllCdm(getAllCdmVO) {
  return request({
    url: 'http://localhost:9010/dataDictionary/getAllCdmInfo',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getAllCdmVO
  })
}

export function searchCdm(searchCdmVO) {
  return request({
    url: 'http://localhost:9010/dataDictionary/searchCdm',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: searchCdmVO
  })
}

export function addCdm(addCdmVO){
  return request({
    url: 'http://localhost:9010/dataDictionary/addCdmInfo',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addCdmVO
  })
}

export function deleteCdm(cdmId){
  return request({
    url: 'http://localhost:9010/dataDictionary/deleteCdm',
    method: 'delete',
    params: cdmId
  })
}

export function batchDeleteCdm(cdmIds){
  return request({
    url: 'http://localhost:9010/dataDictionary/batchDeleteCdm',
    method: 'post',
    data: cdmIds
  })
}

export function getCdmWhenUpdate(cdmId){
  return request({
    url: 'http://localhost:9010/dataDictionary/getCdmWhenUpdate',
    method: 'get',
    params: cdmId
  })
}
export function updateCdm(CdmUpdateVO){
  return request({
    url: 'http://localhost:9010/dataDictionary/updateCdm',
    method: 'post',
    data: CdmUpdateVO
  })
}

