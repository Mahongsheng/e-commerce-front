import request from '@/utils/request'

export function getAllProduct(getAllProductImageVO) {
  return request({
    url: 'http://localhost:9040/productImage/getAllProductImage',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: getAllProductImageVO
  })
}

export function searchProduct(searchProductImageVO) {
  return request({
    url: 'http://localhost:9040/productImage/searchProductImageByTitle',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: searchProductImageVO
  })
}

export function getAllCategory() {
  return request({
    url: 'http://localhost:9040/productImage/getAllCategory',
    method: 'get'
  })
}

export function addProduct(productCategoryAddVO) {
  return request({
    url: 'http://localhost:9040/productImage/addProductImage',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: productCategoryAddVO
  })
}

export function deleteProduct(proIds) {
  return request({
    url: 'http://localhost:9040/productImage/deleteProductImage',
    method: 'post',
    data: proIds
  })
}
export function getProductWhenUpdate(proId) {
  return request({
    url: 'http://localhost:9040/productImage/getProductCatWhenUpdate',
    method: 'get',
    params: proId
  })
}
export function updateProduct(productCatUpdateVO) {
  return request({
    url: 'http://localhost:9040/productImage/updateProductImage',
    method: 'patch',
    data: productCatUpdateVO
  })
}

export function changeStatus(productStatusVO) {
  return request({
    url: 'http://localhost:9040/productImage/changeProStatus',
    method: 'patch',
    data: productStatusVO
  })
}

export function getOSSPolicy() {
  return request({
    url: 'http://localhost:9040/aliyun/oss/policy',
    method: 'get'
  })
}

export function uploadToOSS(uploadFileVO) {
  return request({
    url: 'http://e-commerce-oss.oss-cn-beijing.aliyuncs.com',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data' //如果写成contentType会报错
    },
    data: uploadFileVO
  })
}