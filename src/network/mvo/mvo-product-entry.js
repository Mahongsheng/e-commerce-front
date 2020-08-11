import request from '@/utils/request'

export function getAllProduct(getAllProductVO) {
  return request({
    url: 'http://localhost:9040/productEntry/getAllProduct',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错,
    },
    data: getAllProductVO
  })
}

export function searchProduct(searchProductVO) {
  return request({
    url: 'http://localhost:9040/productEntry/searchProductByTitle',
    method: 'post',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: searchProductVO
  })
}

export function addProduct(addProductVO) {
  return request({
    url: 'http://localhost:9040/productEntry/addProductInfo',
    method: 'put',
    header: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
    data: addProductVO
  })
}

export function deleteProduct(proId) {
  return request({
    url: 'http://localhost:9040/productEntry/deleteProductInfo',
    method: 'delete',
    params: proId
  })
}

export function getProductWhenUpdate(proId) {
  return request({
    url: 'http://localhost:9040/productEntry/getProductInfoWhenUpdate',
    method: 'get',
    params: proId
  })
}

export function updateProduct(productUpdateVO) {
  return request({
    url: 'http://localhost:9040/productEntry/updateProductInfo',
    method: 'patch',
    data: productUpdateVO
  })
}

export function batchDeletePro(proIds) {
  return request({
    url: 'http://localhost:9040/productEntry/batchDeleteProInfo',
    method: 'post',
    data: proIds
  })
}

export function uploadImage(imageVO) {
  return request({
    url: imageVO.url,
    method: 'post',
    data: imageVO.image
  })
}
