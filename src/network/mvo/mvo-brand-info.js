import request from '@/utils/request'

export function getBrands(getAllBrandVO) {
  return request({
    url: 'http://localhost:9020/brand/getBrands',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getAllBrandVO
  })
}

export function addBrand(addBrandVO){
  return request({
    url: 'http://localhost:9020/brand/addBrand',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addBrandVO
  })
}

export function deleteBrand(brdId){
  return request({
    url: 'http://localhost:9020/brand/deleteBrand',
    method: 'delete',
    params: brdId
  })
}

export function updateBrand(brandUpdateVO){
  return request({
    url: 'http://localhost:9020/brand/updateBrand',
    method: 'patch',
    data: brandUpdateVO
  })
}

export function uploadLogo(file) {
  return request({
    url: 'http://localhost:9040/upload/uploadImage',
    method: 'post',
    data: file
  })
}