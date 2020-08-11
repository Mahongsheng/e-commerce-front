import request from '@/utils/request'

export function addMenu(params){
  return request({
    url:'localhost:9010/menu/addMenu',
    method: 'get',
    params
  })
}


