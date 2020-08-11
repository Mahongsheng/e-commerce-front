import request from '@/utils/request'

export function getAllCat(dsrId) {
  return request({
    url: 'http://localhost:9040/productWishlist/getAllCatFromWishlist',
    method: 'get',
    params: dsrId
  })
}

export function getWishlist(getWishlistVO) {
  return request({
    url: 'http://localhost:9040/productWishlist/getWishlistByIdAndCat',
    method: 'get',
    params: getWishlistVO
  })
}

export function deletePro(deleteProVO) {
  return request({
    url: 'http://localhost:9040/productWishlist/deleteProFromWit',
    method: 'delete',
    params: deleteProVO
  })
}

export function batchDeletePro(deleteProVO) {
  return request({
    url: 'http://localhost:9040/productWishlist/batchDeleteProFromWit',
    method: 'delete',
    params: deleteProVO
  })
}