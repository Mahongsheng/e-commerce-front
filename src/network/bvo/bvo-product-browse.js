import request from '@/utils/request'

export function getAllProduct() {
  return request({
    url: 'http://localhost:9040/productBrowse/getAllProductWithStatD',
    method: 'get'
  })
}

export function getProductDetail(proId) {
  return request({
    url: 'http://localhost:9040/productBrowse/getProductInfoDetailById',
    method: 'get',
    params: proId
  })
}

export function addWishlist(operateWishlistVO) {
  return request({
    url: 'http://localhost:9040/productBrowse/addToWishlist',
    method: 'patch',
    params: operateWishlistVO
  })
}

export function deleteWishlist(operateWishlistVO) {
  return request({
    url: 'http://localhost:9040/productBrowse/deleteFromWishlist',
    method: 'patch',
    params: operateWishlistVO
  })
}
